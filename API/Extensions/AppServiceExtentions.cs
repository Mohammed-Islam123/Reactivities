using Application.Activities;
using Application.Activities.Validators;
using Application.Core;
using FluentValidation;
using FluentValidation.AspNetCore;
using Persistence;
using Microsoft.EntityFrameworkCore;
using API.Services;
using Application.Interfaces;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
namespace API.Extensions;

public static class AppServiceExtentions
{
    public static IServiceCollection MapServices(this IServiceCollection collection, IConfiguration configuration)
    {
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        collection.AddOpenApi();
        collection.AddDbContext<ReactivitiesDbContex>((options =>
                {
                    options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
                }));

        collection.AddAutoMapper(typeof(MappingProfiles).Assembly);
        collection.AddFluentValidationAutoValidation();
        collection.AddValidatorsFromAssemblyContaining<CreateActivityDtoValidator>();

        collection.AddMediatR(conf =>
        {
            conf.RegisterServicesFromAssemblies(typeof(List.QueryHandler).Assembly);
            conf.AddOpenBehavior(typeof(ValidationBehaviour<,>));
        });
        collection.AddScoped<AuthServices>();
        collection.AddHttpContextAccessor();
        collection.AddScoped<IUserAccessor, UserAccessor>();
        IServiceCollection serviceCollection = collection.AddAuthorization(opt =>
        {
            opt.AddPolicy("IsActivityHost", policy =>
            {
                policy.AddRequirements(new IsHostRequirment());
            });
        });
        collection.AddTransient<IAuthorizationHandler, IsRequestRequirmentHandler>();
        return collection;
    }
}