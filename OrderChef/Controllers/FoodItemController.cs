using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderChef.Models;

namespace OrderChef.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemController : ControllerBase
    {
        private readonly OrderChefDbContext _context;

        public FoodItemController(OrderChefDbContext context)
        {
            _context = context;
        }

        // GET: api/FoodItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodItem>>> GetFoodItems()
        {
            if (_context.FoodItems != null)
            {
                return await _context.FoodItems.ToListAsync();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
