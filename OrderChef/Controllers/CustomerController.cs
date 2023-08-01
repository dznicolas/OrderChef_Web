using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderChef.Models;

namespace OrderChef.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly OrderChefDbContext _context;

        public CustomerController(OrderChefDbContext context)
        {
            _context = context;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            if (_context.Customers != null)
            {
                return await _context.Customers.ToListAsync();
            }
            else
            {
                return NotFound(); 
            }
        }
    }
}
