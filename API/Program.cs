using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ReactivitiesDbContex>((options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
}));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173/")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


app.UseCors("AllowAllOrigins");
app.MapControllers();

using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider;
try
{
    var context = service.GetRequiredService<ReactivitiesDbContex>();
    await context.Database.MigrateAsync();
    if(!context.Activities.Any()) 
    await Seed.SeedData(context);

}
catch (Exception e)
{

    var logger = service.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "A problem occured when Migrating database");
}

app.Run();
