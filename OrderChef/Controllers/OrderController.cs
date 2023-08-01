using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderChef.Models;

namespace OrderChef.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderChefDbContext _context;

        public OrderController(OrderChefDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderMaster>>> GetOrderMasters()
        {
            var orderMasters = await _context.OrderMasters.Include(x => x.Customer).ToListAsync();
            if (orderMasters == null || orderMasters.Count == 0)
            {
                return NotFound();
            }
            return orderMasters;
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderMaster>> GetOrderMaster(int id)
        {
            var orderDetails = await (from master in _context.Set<OrderMaster>()
                                      join detail in _context.Set<OrderDetail>()
                                      on master.OrderMasterId equals detail.OrderMasterId
                                      join foodItem in _context.Set<FoodItem>()
                                      on detail.FoodItemId equals foodItem.FoodItemId
                                      where master.OrderMasterId == id

                                      select new
                                      {
                                          master.OrderMasterId,
                                          detail.OrderDetailId,
                                          detail.FoodItemId,
                                          detail.Quantity,
                                          detail.FoodItemPrice,
                                          foodItem.FoodItemName
                                      }).ToListAsync();

            // Get order master
            var orderMaster = await (from a in _context.Set<OrderMaster>()
                                     where a.OrderMasterId == id

                                     select new
                                     {
                                         a.OrderMasterId,
                                         a.OrderNumber,
                                         a.CustomerId,
                                         a.Method,
                                         a.Total,
                                         deletedOrderItemIds = "",
                                         orderDetails = orderDetails
                                     }).FirstOrDefaultAsync();

            if (orderMaster == null)
            {
                return NotFound();
            }

            return Ok(orderMaster);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderMaster(int id, OrderMaster orderMaster)
        {
            if (id != orderMaster.OrderMasterId)
            {
                return BadRequest();
            }

            _context.Entry(orderMaster).State = EntityState.Modified;

            foreach (var item in orderMaster.OrderDetails)
            {
                if (item.OrderDetailId == 0)
                {
                    _context.OrderDetails.Add(item);
                }
                else
                {
                    _context.Entry(item).State = EntityState.Modified;
                }
            }

            foreach (var itemId in orderMaster.DeletedOrderItemIds.Split(',').Where(x => !string.IsNullOrEmpty(x)))
            {
                if (long.TryParse(itemId, out long orderId))
                {
                    var orderDetail = await _context.OrderDetails.FindAsync(orderId);
                    if (orderDetail != null)
                    {
                        _context.OrderDetails.Remove(orderDetail);
                    }
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderMasterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<OrderMaster>> PostOrderMaster(OrderMaster orderMaster)
        {
            _context.OrderMasters.Add(orderMaster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderMaster", new { id = orderMaster.OrderMasterId }, orderMaster);
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderMaster(int id)
        {
            var orderMaster = await _context.OrderMasters.FindAsync(id);
            if (orderMaster == null)
            {
                return NotFound();
            }

            _context.OrderMasters.Remove(orderMaster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderMasterExists(int id)
        {
            return _context.OrderMasters.Any(e => e.OrderMasterId == id);
        }
    }
}
