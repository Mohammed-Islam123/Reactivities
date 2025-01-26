
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Update
{
    public class UpdateCommand:IRequest
    {
        public Guid id { get; set; }
        public Activity Activity { get; set; }
    }

    public class UpdateCommandHandler : IRequestHandler<UpdateCommand>
    {
        private readonly ReactivitiesDbContex _contex;
        private readonly IMapper _mapper;

        public UpdateCommandHandler(ReactivitiesDbContex contex, IMapper mapper)
        {
            _contex = contex;
            _mapper = mapper;
        }

        public async Task Handle(UpdateCommand request, CancellationToken cancellationToken)
        {
            var result = await _contex.Activities.FindAsync(request.id);
            if (result is null) 
                throw new ArgumentException();
            _mapper.Map(request.Activity, result);

            await _contex.SaveChangesAsync();
        }

     
    }
    
}