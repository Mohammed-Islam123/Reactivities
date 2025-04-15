using Application.PhotoUpload;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoUploadService
{
    Task<PhotoUploadResult?> UploadPhoto(IFormFile formFile);
    Task<string> DeletePhoto(string PublicId);

}
