using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PhotoUpload;

public class DeletePhoto
{
    public class Command : IRequest<Result<string>>
    {
        public required string PublicId { get; set; }
    }
    public class Handler(ReactivitiesDbContex dbContex, IUserAccessor userAccessor, IPhotoUploadService uploadService) : IRequestHandler<Command, Result<string>>
    {
        private readonly ReactivitiesDbContex _dbContex = dbContex;
        private readonly IUserAccessor _userAccessor = userAccessor;
        private readonly IPhotoUploadService _uploadService = uploadService;

        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _dbContex.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName(), cancellationToken: cancellationToken);
                if (user is null)
                    return Result<string>.Failure("User not found ", 404);


                var photo = user.Photos.FirstOrDefault(p => p.PublicId == request.PublicId);
                if (photo is null)
                    return Result<string>.Failure($"Photo {request.PublicId} not found ", 404);
                if (photo.IsMain)
                    return Result<string>.Failure("Cannot Delete Main Photo  , you need to change it first", 400);

                var deleteResult = await _uploadService.DeletePhoto(request.PublicId);
                user.Photos.Remove(photo);


                return await _dbContex.SaveChangesAsync(cancellationToken) > 0 ? Result<string>.Success(deleteResult) : Result<string>.Failure("Error Deleting photo", 500);

            }
            catch (Exception e)
            {
                return Result<string>.Failure(e.Message, 500);
                throw;
            }

        }

    }

}
