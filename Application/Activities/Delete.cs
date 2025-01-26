using MediatR;
using Persistence;

namespace Application.Activities;

public class Delete
{
    public class DeleteCommand:IRequest
    {
        public Guid Guid { get; set; }
    }

    public class DeleteCommandHandler: IRequestHandler<DeleteCommand>
    {
        private readonly ReactivitiesDbContex _contex;

        public DeleteCommandHandler(ReactivitiesDbContex contex)
        {
            _contex = contex;
        }

        public async Task Handle(DeleteCommand request, CancellationToken cancellationToken)
        {
            var result = await _contex.Activities.FindAsync(request.Guid);
           ArgumentNullException.ThrowIfNull(result);
            _contex.Activities.Remove(result);
            await _contex.SaveChangesAsync();
        }
    }
}