using Domain;
using MediatR;
using Microsoft.Identity.Client;
using Persistence;

namespace Application.Activities;

public class Create
{
    public class CreateActivityCommand:IRequest
    {
        public Activity activity { get; set; }   
    }
    public class CreateActivityCommandHandler: IRequestHandler<CreateActivityCommand>
    {
        private readonly ReactivitiesDbContex _contex;

        public CreateActivityCommandHandler(ReactivitiesDbContex contex)
        {
            _contex = contex;
        }
            

        public async Task Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            await _contex.Activities.AddAsync(request.activity);
            await _contex.SaveChangesAsync();
        }
    }
    
}