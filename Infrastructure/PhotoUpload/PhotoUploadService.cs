using Application.Interfaces;
using Application.PhotoUpload;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.PhotoUpload;

public class PhotoUploadService : IPhotoUploadService
{
    private Cloudinary _cloudinary;
    public PhotoUploadService(IOptions<CloudianarySettings> options)
    {
        var Account = new Account(options.Value.CloudName, options.Value.ApiKey, options.Value.ApiSecret);
        _cloudinary = new Cloudinary(Account);
    }
    public async Task<string> DeletePhoto(string PublicId)
    {
        var deleteParams = new DeletionParams(PublicId);
        var result = await _cloudinary.DestroyAsync(deleteParams);
        if (result.Error != null)
            throw new Exception(result.Error.Message);
        return result.Result;
    }

    public async Task<PhotoUploadResult?> UploadPhoto(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return null;
        await using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new CloudinaryDotNet.FileDescription { FileName = file.FileName, Stream = stream },
            Transformation = new CloudinaryDotNet.Transformation().Height(500).Width(500).Crop("fill"),
            Folder = "Reactivities",

        };
        var uploadResults = await _cloudinary.UploadAsync(uploadParams);
        if (uploadResults.Error != null)
            throw new Exception(uploadResults.Error.Message);
        return new PhotoUploadResult
        {
            PublicId = uploadResults.PublicId,
            Url = uploadResults.SecureUrl.AbsoluteUri
        };
    }
}
