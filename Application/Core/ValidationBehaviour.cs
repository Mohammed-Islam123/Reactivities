﻿using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidationBehaviour<TRequest, TResponce>(IValidator<TRequest>? validator = null) : IPipelineBehavior<TRequest, TResponce> where TRequest : notnull
{
    public async Task<TResponce> Handle(TRequest request, RequestHandlerDelegate<TResponce> next, CancellationToken cancellationToken)
    {
        if (validator is null) return await next();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {

            throw new ValidationException(validationResult.Errors);
        }
        return await next();
    }
}