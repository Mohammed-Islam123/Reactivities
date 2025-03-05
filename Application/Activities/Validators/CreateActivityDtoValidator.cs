using Application.DTOs;

namespace Application.Activities.Validators;
public class CreateActivityDtoValidator: BaseActivityValidator<CreateActivityDto, Create.CreateActivityCommand>
{
    public CreateActivityDtoValidator(): base((command => command.ActivityDto ))
    {
        
    }
}

