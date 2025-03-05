using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Delete
{
    public class DeleteCommand:IRequest<Result<bool>>
    {
        public Guid Guid { get; set; }
    }

    public class DeleteCommandHandler: IRequestHandler<DeleteCommand, Result<bool>>
    {
        private readonly ReactivitiesDbContex _contex;

        public DeleteCommandHandler(ReactivitiesDbContex contex)
        {
            _contex = contex;
        }

        public async  Task<Result<bool>> Handle(DeleteCommand request, CancellationToken cancellationToken)
        {
            var result = await _contex.Activities.FindAsync(request.Guid);
            if (result is null)
              return Result<bool>.Failure("Activitity not Found", 404);
            _contex.Activities.Remove(result);
            return (await _contex.SaveChangesAsync() > 0)
                ? Result<bool>.Success(true)
                : Result<bool>.Failure("Error During Deletion", 500);
        }
    }
}