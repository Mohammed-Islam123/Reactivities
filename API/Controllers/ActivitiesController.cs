using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using Persistence;
using SQLitePCL;

namespace API.Controllers;

public class ActivitiesController: BaseController
{
    private readonly ReactivitiesDbContex _context;
    public ActivitiesController(ReactivitiesDbContex context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return Ok(await _context.Activities.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        var result =  await _context.Activities.FindAsync(id);
        return result is null ? NotFound() : Ok(result); 
    }
}