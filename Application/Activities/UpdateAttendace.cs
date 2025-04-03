using System.Data.Common;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class UpdateAttendace
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Guid { get; set; }
    }

    public class Handler(ReactivitiesDbContex dbContex, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        private readonly ReactivitiesDbContex _dbContex = dbContex;
        private readonly IUserAccessor _userAccessor = userAccessor;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {

            var activity = await _dbContex.Activities.Include(act => act.Attendees).ThenInclude(at => at.AppUser).FirstOrDefaultAsync(act => act.Id == request.Guid);
            if (activity is null)
                return Result<Unit>.Failure("Activity Not Found", 404);
            var user = activity.Attendees.FirstOrDefault(att => (att.AppUser.UserName == _userAccessor.GetUserName()));
            if (user is null)
            {
                var appUser = await _dbContex.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName());
                if (appUser is null)
                    return Result<Unit>.Failure("User Not Found", 404);
                activity.Attendees.Add(new Domain.Attendee { ActivityId = activity.Id, AppUserId = appUser.Id });
            }
            else if (user.IsHost)
            {
                activity.IsCancelled = !activity.IsCancelled;
                Console.WriteLine(activity.IsCancelled);

            }
            else
            {
                activity.Attendees.Remove(user);
            }
            await _dbContex.SaveChangesAsync();
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
