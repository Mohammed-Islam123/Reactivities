using Application.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class EditActivityDtoValidator :BaseActivityValidator<EditActivityDto, Update.UpdateCommand>
{
    public EditActivityDtoValidator():base(command => command.Activity)
    {
        RuleFor(x => x.Activity.Id).NotEmpty();
    }
    
}