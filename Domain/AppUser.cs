using System.Reflection.PortableExecutable;
using Microsoft.AspNetCore.Identity;

public class AppUser:IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    
}