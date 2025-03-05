using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class ReactivitiesDbContex:IdentityDbContext<AppUser>
{
    public ReactivitiesDbContex(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<Activity> Activities { get; set; }
    
    
}