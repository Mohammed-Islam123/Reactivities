namespace Domain;

public class Photo
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string PublicId { get; set; } = null!;
    public string Url { get; set; } = null!;
    public bool IsMain { get; set; } = false;
    public string AppUserId { get; set; } = null!;
    public virtual AppUser User { get; set; } = null!;
}
