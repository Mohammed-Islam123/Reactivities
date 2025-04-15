using System.Net;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PhotoUpload;

public class SetMainPhoto
{
    public class Command : IRequest<Result<bool>>
    {
        public required string Id { get; set; }
    }
    public class Handler(ReactivitiesDbContex dbContex, IUserAccessor userAccessor) : IRequestHandler<Command, Result<bool>>
    {
        private readonly ReactivitiesDbContex _dbContex = dbContex;
        private readonly IUserAccessor _userAccessor = userAccessor;

        public async Task<Result<bool>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _dbContex.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());
            if (user is null)
                return Result<bool>.Failure("User Not Found", (int)HttpStatusCode.NotFound);
            var selectedPhoto = user.Photos.FirstOrDefault(p => p.Id.ToString() == request.Id);
            if (selectedPhoto is null)
                return Result<bool>.Failure("Photo Not Found", (int)HttpStatusCode.NotFound);
            if (selectedPhoto.IsMain)
                return Result<bool>.Success(true);
            var currentMain = user.Photos.FirstOrDefault(p => p.IsMain);
            selectedPhoto.IsMain = true;
            if (currentMain is null)
                return Result<bool>.Failure("Error fetching Main photo", (int)HttpStatusCode.BadRequest);
            currentMain.IsMain = false;
            return await _dbContex.SaveChangesAsync(cancellationToken) > 0 ? Result<bool>.Success(true) : Result<bool>.Failure("Error saving changes", (int)HttpStatusCode.InternalServerError);


        }

    }

}
