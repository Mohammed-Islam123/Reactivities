using API.Core;
using API.DTOs;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API.Services;
public class AuthServices
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ReactivitiesDbContex _dbContex;
    private readonly TokenService _tokenService;

    public AuthServices(UserManager<AppUser> userManager, ReactivitiesDbContex dbContex, TokenService tokenService)
    {
        _userManager = userManager;
        _dbContex = dbContex;
        _tokenService = tokenService;
    }
    public async Task<IdentityResult<UserDTO>> RegisterUserAsync(SignUpDTO signUpDTO)
    {
        var user = new AppUser
        {
            DisplayName = signUpDTO.DisplayName,
            Email = signUpDTO.Email,
            UserName = signUpDTO.UserName
        };
        var result = await _userManager.CreateAsync(user, signUpDTO.Password);
        if (!result.Succeeded)
        {
            return IdentityResult<UserDTO>.Failure(result.Errors, 400);

        }
        return IdentityResult<UserDTO>.Success(new UserDTO
        {
            DisplayName = user.DisplayName,
            UserName = user.UserName,
            Image = "",
            Token = _tokenService.CreateToken(user),
            Email = user.Email
        });
    }
}