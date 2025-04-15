using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class ReactivitiesDbContex : IdentityDbContext<AppUser>
{
    public ReactivitiesDbContex(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Activity> Activities { get; set; }
    public DbSet<Attendee> Attendees { get; set; }
    public DbSet<Photo> Photos { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Attendee>()
        .HasKey(x => new { x.ActivityId, x.AppUserId });
        builder.Entity<Attendee>()
        .HasOne(x => x.AppUser)
        .WithMany(a => a.Attendees);
        builder.Entity<Attendee>()
        .HasOne(x => x.Activity)
        .WithMany(a => a.Attendees);

    }
}