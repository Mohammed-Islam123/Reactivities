using System.IO.Compression;

namespace API.DTOs;
public class UserDTO
{
    public string DisplayName { get; set; } = "";
    public string Token { get; set; } = "";
    public string Image { get; set; } = "";
    public string UserName { get; set; } = "";
}