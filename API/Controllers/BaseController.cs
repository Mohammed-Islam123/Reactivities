using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class BaseController : ControllerBase
{
    private IMediator? _mediator;
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()!;

    protected ActionResult HandleResult<T>(Result<T> result)
    {
        return result.IsSuccess switch
        {
            false when result.Value == null => NotFound(),
            true when result.Value != null => Ok(result.Value),
            _ => BadRequest(result.Error)
        };
    }

}