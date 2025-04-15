
using Domain;
using Microsoft.AspNetCore.Identity;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; } = null!;
    public string Bio { get; set; } = null!;

    public ICollection<Attendee> Attendees { get; set; } = [];
    public ICollection<Photo> Photos { get; set; } = [];

}