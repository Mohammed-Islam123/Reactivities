using Application.Activities;
using Application.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[AllowAnonymous]
public class ActivitiesController : BaseController
{



    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {

        return HandleResult(await Mediator.Send(new List.Query()));
    }




    [HttpGet("{id}", Name = "GetActivity")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return HandleResult<Activity>(await Mediator.Send(new Details.Query { Guid = id }));
    }

    [HttpPost]

    public async Task<ActionResult> CreateActivity(CreateActivityDto activityDto)
    {

        var result = await Mediator.Send(new Create.CreateActivityCommand { ActivityDto = activityDto });
        return !result.IsSuccess ? HandleResult(result) : CreatedAtRoute("GetActivity", new { id = result.Value }, new { id = result.Value, activityDto });
    }


    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateActivity(Guid id, EditActivityDto activity)
    {
        var result = await Mediator.Send(new Update.UpdateCommand { id = id, Activity = activity });

        return result.IsSuccess ? NoContent() : HandleResult(result);

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        var result = await Mediator.Send(new Delete.DeleteCommand { Guid = id });

        return result.IsSuccess ? NoContent() : HandleResult(result);
    }


}
