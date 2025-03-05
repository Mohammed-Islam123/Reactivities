using Application.Core;
using Application.DTOs;
using AutoMapper;
using MediatR;
using Persistence;
using Activity = Domain.Activity;

namespace Application.Activities;

public class Create
{
    
    public class CreateActivityCommand:IRequest< Result<Guid>>
    {
        public CreateActivityDto ActivityDto { get; set; }   
    }
   
    public class CreateActivityCommandHandler: IRequestHandler<CreateActivityCommand, Result<Guid>>
    {
        private readonly ReactivitiesDbContex _contex;
        private readonly IMapper _mapper;

        public CreateActivityCommandHandler(ReactivitiesDbContex contex, IMapper mapper)
        {
            _contex = contex;
            _mapper = mapper;
        }
            

        public async Task< Result<Guid>>  Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = _mapper.Map<Activity>(request.ActivityDto);
            
            await _contex.Activities.AddAsync(activity);
            ;
            return (await _contex.SaveChangesAsync() > 0
                ? Result<Guid>.Success(activity.Id)
                : Result<Guid>.Failure("Error During Creating", 500));

        }
    }
    
}