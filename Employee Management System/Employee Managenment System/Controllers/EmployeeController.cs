using Employee_Managenment_System.Data;
using Employee_Managenment_System.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employee_Managenment_System.Controllers
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeeController : Controller
    {
       
            private readonly EmployeeDbContext employeeDbContext;
            public EmployeeController(EmployeeDbContext employeeDbContext)
            {
                this.employeeDbContext = employeeDbContext;
            }
            // Get All Employee records

            [HttpGet]
            public async Task<IActionResult> GetAllEmployee()
            {
                var cards = await employeeDbContext.EmployeeTable.ToListAsync();
                return Ok(cards);
            }


            //Get Single Employee Record

            [HttpGet]
            [Route("{id:guid}")]
            [ActionName("GetEmployee")]
            public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
            {
                var employee = await employeeDbContext.EmployeeTable.FirstOrDefaultAsync(x => x.Id == id);
                if (employee != null)
                {
                    return Ok(employee);
                }
                return NotFound("Card not Found");
            }

            //Pushing Employee Record into Database

            [HttpPost]
            public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
            {
                employee.Id = Guid.NewGuid();
                await employeeDbContext.EmployeeTable.AddAsync(employee);
                await employeeDbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
            }


            //Updating Employee Details

            [HttpPut]
            [Route("{id:guid}")]

            public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, [FromBody] Employee employee)
            {
                var existingEmployee = await employeeDbContext.EmployeeTable.FirstOrDefaultAsync(x => x.Id == id);
                if (existingEmployee != null)
                {
                    existingEmployee.EmployeeName = employee.EmployeeName;
                    existingEmployee.Company = employee.Company;
                    existingEmployee.Designation = employee.Designation;
                    existingEmployee.CTC = employee.CTC;
                    existingEmployee.Location = employee.Location;
                    await employeeDbContext.SaveChangesAsync();
                    return Ok(existingEmployee);
                }
                return NotFound("Card Not Found");
            }

            //Deleting a Employee Record
            [HttpDelete]
            [Route("{id:guid}")]
            public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)
            {
                var existingEmployee = await employeeDbContext.EmployeeTable.FirstOrDefaultAsync(x => x.Id == id);
                if (existingEmployee != null)
                {
                    employeeDbContext.Remove(existingEmployee);
                    await employeeDbContext.SaveChangesAsync();
                    return Ok(existingEmployee);
                }
                return NotFound("Card Not Found");
            }
        }
}
