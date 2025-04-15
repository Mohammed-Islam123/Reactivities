using Application.DTOs;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProfilesController : BaseController
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<AttendeeProfileDto>> GetProfile(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { UserName = id }));
        }
    }
}
