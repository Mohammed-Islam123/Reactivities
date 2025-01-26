using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<List<Activity>>
    {
    }

    public class QueryHandler : IRequestHandler<Query, List<Activity>>
    {
        private ReactivitiesDbContex _context;
        public QueryHandler(ReactivitiesDbContex dbContex)
        {
            _context = dbContex;
        }

        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Activities.ToListAsync();

        }
    }
}