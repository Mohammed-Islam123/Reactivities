using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService
{
    public string CreateToken(AppUser user)
    {
        var claims = new List<Claim> {
            new(ClaimTypes.Name, user.UserName!),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email!),

        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("me3iyGlbJGkX9jmbmALUiyTfn9hIvs4pBdCJd7gOqAJZlLdMDXPeT7zozT84DRGi"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(3),
            SigningCredentials = creds,

        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

}
