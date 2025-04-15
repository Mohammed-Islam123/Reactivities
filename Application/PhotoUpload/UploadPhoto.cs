using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PhotoUpload;

public class UploadPhoto
{
    public class Command : IRequest<Result<PhotoUploadResult>>
    {
        public required IFormFile File { get; set; }
    }
    public class Handler(ReactivitiesDbContex dbContex, IUserAccessor userAccessor, IPhotoUploadService uploadService) : IRequestHandler<Command, Result<PhotoUploadResult>>
    {
        private readonly ReactivitiesDbContex _dbContex = dbContex;
        private readonly IUserAccessor _userAccessor = userAccessor;
        private readonly IPhotoUploadService _uploadService = uploadService;

        public async Task<Result<PhotoUploadResult>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _dbContex.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName(), cancellationToken: cancellationToken);
            if (user is null)
                return Result<PhotoUploadResult>.Failure("User not found ", 404);
            var uploadResult = await _uploadService.UploadPhoto(request.File);
            if (uploadResult is null)
                return Result<PhotoUploadResult>.Failure("Error Uploading Photo", 400);

            var photo = new Photo
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.Url,
                IsMain = !user.Photos.Any(p => p.IsMain)

            };
            _dbContex.Entry(photo).State = EntityState.Added;
            user.Photos.Add(photo);


            return await _dbContex.SaveChangesAsync(cancellationToken) > 0 ? Result<PhotoUploadResult>.Success(new PhotoUploadResult { PublicId = uploadResult.PublicId, Url = uploadResult.Url, IsMain = photo.IsMain }) : Result<PhotoUploadResult>.Failure("Error Saving photo", 500);
        }

    }
}
