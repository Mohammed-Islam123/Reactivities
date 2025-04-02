using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContext) : IUserAccessor
{
    private readonly IHttpContextAccessor _httpContext = httpContext;

    public string GetUserName()
    {
        return _httpContext.HttpContext?.User.FindFirstValue(ClaimTypes.Name) ?? "";
    }
}
