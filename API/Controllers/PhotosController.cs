using Application.PhotoUpload;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<PhotoUploadResult>> UploadPhoto(UploadPhoto.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpDelete("delete")]
        public async Task<ActionResult<string>> DeletePhoto(DeletePhoto.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpPost("set-main/{id}")]
        public async Task<ActionResult<string>> SetMainPhoto(string id)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command { Id = id }));
        }



    }
}
