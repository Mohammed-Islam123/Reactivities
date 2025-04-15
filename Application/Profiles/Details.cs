using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Details
{
    public class Query : IRequest<Result<AttendeeProfileDto>>
    {
        public required string UserName { get; set; }
    }
    public class Handler(ReactivitiesDbContex dbContex, IMapper mapper) : IRequestHandler<Query, Result<AttendeeProfileDto>>
    {
        private readonly ReactivitiesDbContex _dbContex = dbContex;
        private readonly IMapper _mapper = mapper;

        public async Task<Result<AttendeeProfileDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _dbContex.Users.ProjectTo<AttendeeProfileDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(u => u.UserName == request.UserName, cancellationToken: cancellationToken);
            if (user is null)
                return Result<AttendeeProfileDto>.Failure("Cannot find user", 404);
            return Result<AttendeeProfileDto>.Success(user);
        }
    }
}
