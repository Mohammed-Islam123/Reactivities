using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security;

public class IsHostRequirment : IAuthorizationRequirement
{
}


public class IsRequestRequirmentHandler(ReactivitiesDbContex dbContex, IHttpContextAccessor httpContext) : AuthorizationHandler<IsHostRequirment>
{
    private readonly ReactivitiesDbContex _dbContex = dbContex;
    private readonly IHttpContextAccessor _httpContext = httpContext;

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirment requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return Task.CompletedTask;
        if (!Guid.TryParse(_httpContext.HttpContext?.Request.RouteValues.SingleOrDefault(arg => arg.Key == "id").Value?.ToString(), out Guid activityIdGuid))
            return Task.CompletedTask;
        var attendee = _dbContex.Attendees.FindAsync(activityIdGuid, userId).Result;
        if (attendee is null)
            return Task.CompletedTask;
        if (attendee.IsHost)
            context.Succeed(requirement);
        return Task.CompletedTask;

    }
}
