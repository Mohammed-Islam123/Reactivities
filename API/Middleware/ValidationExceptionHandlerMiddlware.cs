using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ValidationExceptionHandlerMiddleware:IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
     
        try
        {
            await next(context);
        }
        catch (ValidationException e)
        {
            await HandleValidationException(context , e.Errors);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private async Task HandleValidationException(HttpContext context, IEnumerable<ValidationFailure> eErrors)
    {

        var problemDetails = new ValidationProblemDetails()
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "Validation errors occurred.",
            Detail = "See the errors property for details.",
            Instance = context.Request.Path
        };

        foreach (var error in eErrors)
        {
            problemDetails.Errors.Add(error.PropertyName, [error.ErrorMessage]);
        }

        context.Response.ContentType = "application/problem+json";
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsJsonAsync(problemDetails);
    }
}