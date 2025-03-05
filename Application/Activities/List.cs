using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<Result<List<Activity>>>
    {
    }

    public class QueryHandler : IRequestHandler<Query, Result<List<Activity>>>
    {
        private ReactivitiesDbContex _context;
        public QueryHandler(ReactivitiesDbContex dbContex)
        {
            _context = dbContex;
        }

        public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var result =  await _context.Activities.ToListAsync();
            return Result<List<Activity>>.Success(result);

        }
    }
}