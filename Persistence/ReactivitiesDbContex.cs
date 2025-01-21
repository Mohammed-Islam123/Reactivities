using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class ReactivitiesDbContex:DbContext
{
    public ReactivitiesDbContex(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<Activity> Activities { get; set; }
    
    
}