using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class SignUpDTO
{
    [Required]
    public required string Email { get; set; }
    [Required]
    public required string Password { get; set; }
    [Required]
    public required string DisplayName { get; set; }
    [Required]
    public required string UserName { get; set; }
}
