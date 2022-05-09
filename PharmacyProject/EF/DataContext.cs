using Microsoft.EntityFrameworkCore;
using PharmacyProject.Entities;

namespace PharmacyProject.EF
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users => Set<User>();
        public DbSet<Pharmacy> Pharmacies => Set<Pharmacy>();
        public DbSet<Car> Cars => Set<Car>();
        public DbSet<Drug> Drugs => Set<Drug>();
        public DbSet<Basket> Baskets => Set<Basket>();

        private readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to SqlServer database
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<User>()
                .HasMany(c => c.Drugs)
                .WithMany(s => s.Users)
                .UsingEntity<Basket>(
                   j => j
                    .HasOne(pt => pt.Drug)
                    .WithMany(t => t.Baskets)
                    .HasForeignKey(pt => pt.DrugId),
                j => j
                    .HasOne(pt => pt.User)
                    .WithMany(p => p.Baskets)
                    .HasForeignKey(pt => pt.UserId)
                    .OnDelete(DeleteBehavior.Restrict),
                j =>
                {
                    j.HasKey(t => new { t.UserId, t.DrugId });
                    j.ToTable("Baskets");
                });

            base.OnModelCreating(modelBuilder);
        }
    }
}
