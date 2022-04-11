using System.ComponentModel.DataAnnotations;

namespace Employee_Managenment_System.Models
{
    public class Employee
    {
        [Key]
        public Guid Id { get; set; }
        public string EmployeeName { get; set; }
        public string Company { get; set; }
        public string Designation { get; set; }
        public string CTC { get; set; }
        public string Location { get; set; }


    }
}
