using Employee_Managenment_System.Models;
using Microsoft.EntityFrameworkCore;

namespace Employee_Managenment_System.Data
{
    public class EmployeeDbContext:DbContext
    {
        public EmployeeDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Employee> EmployeeTable { get; set; }
    }
}
