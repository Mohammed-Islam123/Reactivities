using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Details
{
    public class Query: IRequest<Result<Activity>>
    {
        public Guid Guid { get; set; }
    }
    public class QueryHandler: IRequestHandler<Query, Result<Activity>>
    {
        private ReactivitiesDbContex _context;
        public QueryHandler(ReactivitiesDbContex dbContex)
        {
            _context = dbContex;
        }
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var result =  await _context.Activities.FindAsync(request.Guid);
            return result is null
                ? new Result<Activity>()
                {
                    Error = "Activity Not Found",
                    Code = 404,
                    IsSuccess = false
                }
                : new()
                {
                    IsSuccess = true,
                    Value = result
                };
        }

       
    }
}