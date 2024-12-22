using HireMeF.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HireMeF.Data
{
	public class ApplicationDbContext: DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{
		}
		public DbSet<User> Users { get; set; }
		public DbSet<Employee> Employees { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>().HasKey(u => u.Id);
			modelBuilder.Entity<Employee>().HasKey(e => e.Id);

		}
	}
}
