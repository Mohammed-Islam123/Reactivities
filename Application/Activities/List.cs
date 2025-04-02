using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<Result<List<GetActivityDto>>>
    {

    }

    public class QueryHandler(ReactivitiesDbContex dbContex, IMapper mapper) : IRequestHandler<Query, Result<List<GetActivityDto>>>
    {
        private readonly ReactivitiesDbContex _context = dbContex;
        private readonly IMapper _mapper = mapper;

        public async Task<Result<List<GetActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var result = await _context.Activities.ProjectTo<GetActivityDto>(_mapper.ConfigurationProvider).ToListAsync();

            return Result<List<GetActivityDto>>.Success(result);

        }
    }
}