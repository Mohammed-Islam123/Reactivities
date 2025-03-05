using System.Security.Principal;
using System.Text;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions;

public static class IdentityServiceExtension
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection collection, IConfiguration configuration)
    {
        collection.AddIdentityCore<AppUser>(opt =>
        {
            opt.User.RequireUniqueEmail = true;
        })
            .AddEntityFrameworkStores<ReactivitiesDbContex>();
        collection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt =>
        {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("me3iyGlbJGkX9jmbmALUiyTfn9hIvs4pBdCJd7gOqAJZlLdMDXPeT7zozT84DRGi"))
                ,
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });
        collection.AddScoped<TokenService>();
        return collection;
    }
}