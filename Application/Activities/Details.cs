using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class Details
{
    public class Query : IRequest<Result<GetActivityDto>>
    {
        public Guid Guid { get; set; }
    }
    public class QueryHandler(ReactivitiesDbContex dbContex, IMapper mapper) : IRequestHandler<Query, Result<GetActivityDto>>
    {
        private ReactivitiesDbContex _context = dbContex;
        private readonly IMapper _mapper = mapper;

        public async Task<Result<GetActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var result = await _context.Activities.Where(act => act.Id == request.Guid).ProjectTo<GetActivityDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(cancellationToken: cancellationToken);
            return result is null
                ? new Result<GetActivityDto>()
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