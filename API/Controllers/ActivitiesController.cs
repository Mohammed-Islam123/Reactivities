using API.DTOs;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController: BaseController
{

   

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new List.Query());
    }

    [HttpGet("{id}", Name = "GetActivity") ]
    
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        var result  = await Mediator.Send(new Details.Query{Guid = id});
        return result is null ? NotFound() : result;
    }

    [HttpPost]

    public async Task<ActionResult> CreateActivity(Activity activity)
    {
        await Mediator.Send(new Create.CreateActivityCommand { activity = activity });
        return CreatedAtRoute("GetActivity", new {id = activity.Id}, activity);
    }


    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateActivity(Guid id,Activity activity)
    {
        await Mediator.Send(new Update.UpdateCommand { id = id, Activity = activity });
        return NoContent();

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        try
        {
            await Mediator.Send(new Delete.DeleteCommand { Guid = id });
            return NoContent();
        }
        catch (ArgumentNullException e)
        {

            return NotFound();
        }
    }
    
}
