namespace Application.DTOs;

public class GetActivityDto
{

    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Description { get; set; } = null!;
    public string Category { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Venue { get; set; } = null!;
    public string HostUserName { get; set; } = null!;
    public bool IsCancelled { get; set; }
    public List<AttendeeProfileDto> Attendees { get; set; } = [];

}
