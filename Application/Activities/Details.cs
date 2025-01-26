using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Details
{
    public class Query: IRequest<Activity>
    {
        public Guid Guid { get; set; }
    }
    public class QueryHandler: IRequestHandler<Query, Activity>
    {
        private ReactivitiesDbContex _context;
        public QueryHandler(ReactivitiesDbContex dbContex)
        {
            _context = dbContex;
        }
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Activities.FindAsync(request.Guid);
        }

       
    }
}