namespace Application.PhotoUpload;

public class PhotoUploadResult
{
    public required string PublicId { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }

}
