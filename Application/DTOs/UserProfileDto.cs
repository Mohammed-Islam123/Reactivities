namespace Application.DTOs;

public class UserProfileDto
{
    public string UserName { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string Bio { get; set; } = null!;
    public string Image { get; set; } = null!;
    public ICollection<PhotoDto> Photos { get; set; } = [];

}
