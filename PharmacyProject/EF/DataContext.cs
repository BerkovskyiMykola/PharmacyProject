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
    }
}
