using Application.Activities;
using Application.Core;
using Persistence;
using Microsoft.EntityFrameworkCore;
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
collection.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",
                b =>
                {
                    b.WithOrigins("http://localhost:5173/")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });
collection.AddAutoMapper(typeof(MappingProfiles).Assembly);
collection.AddMediatR(conf => conf.RegisterServicesFromAssemblies(typeof(List.QueryHandler).Assembly));
return collection;
    }
}