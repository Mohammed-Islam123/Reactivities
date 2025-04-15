using System.Security.Claims;
using API.DTOs;
using API.Services;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;
    private readonly AuthServices _authServices;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService, AuthServices authServices)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _authServices = authServices;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login([FromBody] LoginDTO loginDTO)
    {
        var user = await _userManager.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Email == loginDTO.Email);
        if (user is null)
            return Unauthorized();
        var success = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
        if (!success)
            return Unauthorized();

        return CreateUserDTO(user);
    }



    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> RegisterUser(SignUpDTO signUpDTO)
    {
        var result = await _authServices.RegisterUserAsync(signUpDTO);
        if (!result.IsSuccess && result.Error != null)
        {
            foreach (var error in result.Error)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }
        return Ok(result.Value);
    }


    //api/account
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
        var user = await _userManager.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Email == User.FindFirstValue(ClaimTypes.Email));
        if (user is null)
            return Unauthorized();
        return Ok(CreateUserDTO(user));
    }

    private UserDTO CreateUserDTO(AppUser user)
    {
        return new UserDTO
        {
            DisplayName = user.DisplayName,
            Image = user.Photos.FirstOrDefault(p => p.IsMain)?.Url!,
            UserName = user.UserName!,
            Token = _tokenService.CreateToken(user),
            Email = user.Email!

        };
    }
}

