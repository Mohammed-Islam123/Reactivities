
using Application.Core;
using Application.DTOs;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Update
{
    public class UpdateCommand:IRequest<Result<bool>>
    {
        public Guid id { get; set; }
        public EditActivityDto Activity { get; set; }
    }

    public class UpdateCommandHandler : IRequestHandler<UpdateCommand, Result<bool>>
    {
        private readonly ReactivitiesDbContex _contex;
        private readonly IMapper _mapper;

        public UpdateCommandHandler(ReactivitiesDbContex contex, IMapper mapper)
        {
            _contex = contex;
            _mapper = mapper;
        }

        public async Task<Result<bool>> Handle(UpdateCommand request, CancellationToken cancellationToken)
        {
            var result = await _contex.Activities.FindAsync(request.id);
            if (result is null )
                return Result<bool>.Failure("Activity Not Exist", 404);
            
            _mapper.Map(request.Activity, result);
   
            return (await _contex.SaveChangesAsync())> 0? Result<bool>.Success(true) : Result<bool>.Failure("Error During Saving", 500);
        }

     
    }
    
}