namespace API.DTOs;

public class UpdateActivityDTO
{
    public string Title { get; set; }="";
    public DateTime Date { get; set; }
    public string Description { get; set; } = "";
    public string  Category { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;

}