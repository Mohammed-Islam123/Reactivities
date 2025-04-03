using Application.Activities;
using Application.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
// [AllowAnonymous]
public class ActivitiesController : BaseController
{



    [HttpGet]
    public async Task<ActionResult<List<GetActivityDto>>> GetActivities()
    {
        var result = await Mediator.Send(new List.Query());
        return HandleResult(result);
    }




    [HttpGet("{id}", Name = "GetActivity")]
    public async Task<ActionResult<GetActivityDto>> GetActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Guid = id }));
    }


    [HttpPost("{id}/attend", Name = "AttendActivity")]
    public async Task<ActionResult<GetActivityDto>> AttendActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendace.Command { Guid = id }));
    }

    [HttpPost]

    public async Task<ActionResult<GetActivityDto>> CreateActivity(CreateActivityDto activityDto)
    {

        var result = await Mediator.Send(new Create.CreateActivityCommand { ActivityDto = activityDto });
        return HandleResult(result);
    }

    [Authorize("IsActivityHost")]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateActivity(Guid id, BaseActivityDTO activity)
    {
        var result = await Mediator.Send(new Update.UpdateCommand { id = id, Activity = activity });

        return result.IsSuccess ? NoContent() : HandleResult(result);

    }
    [Authorize("IsActivityHost")]

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        var result = await Mediator.Send(new Delete.DeleteCommand { Guid = id });

        return result.IsSuccess ? NoContent() : HandleResult(result);
    }


}
