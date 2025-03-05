using Application.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator< Tdto ,T>: AbstractValidator<T> where Tdto :BaseActivityDTO
{
    public BaseActivityValidator(Func<T, Tdto> extractDto)
    {
        RuleFor(act =>extractDto( act).Title).NotEmpty();
        RuleFor(act =>extractDto( act).Category).NotEmpty();
        RuleFor(act =>extractDto( act).City).NotEmpty();
        RuleFor(act =>extractDto( act).Description).NotEmpty();
        RuleFor(act =>extractDto( act).Date).NotEmpty();
        RuleFor(act =>extractDto( act).Venue).NotEmpty(); 
    }
}