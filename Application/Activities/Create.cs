using Application.Core;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using Activity = Domain.Activity;

namespace Application.Activities;

public class Create
{

    public class CreateActivityCommand : IRequest<Result<GetActivityDto>>
    {
        public CreateActivityDto ActivityDto { get; set; } = null!;
    }

    public class CreateActivityCommandHandler(UserManager<AppUser> userManager, ReactivitiesDbContex contex, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<CreateActivityCommand, Result<GetActivityDto>>
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly ReactivitiesDbContex _contex = contex;
        private readonly IMapper _mapper = mapper;
        private readonly IUserAccessor _userAccessor = userAccessor;

        public async Task<Result<GetActivityDto>> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = _mapper.Map<Activity>(request.ActivityDto);
            var user = await _userManager.FindByNameAsync(_userAccessor.GetUserName());

            if (user is null)
                return Result<GetActivityDto>.Failure("User Not Found", 404);
            activity.Attendees.Add(new Attendee { Activity = activity, AppUser = user, IsHost = true });
            await _contex.Activities.AddAsync(activity);
            ;
            return await _contex.SaveChangesAsync(cancellationToken) > 0
                ? Result<GetActivityDto>.Success(_mapper.Map<GetActivityDto>(activity))
                : Result<GetActivityDto>.Failure("Error During Creating", 500);
        }
    }

}