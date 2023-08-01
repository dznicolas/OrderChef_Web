using Microsoft.EntityFrameworkCore;

namespace OrderChef.Models
{
    public class OrderChefDbContext : DbContext
    {
        public OrderChefDbContext(DbContextOptions<OrderChefDbContext> options) : base(options) {

        }
        
        public DbSet<Customer>? Customers { get; set; }
        public DbSet<FoodItem>? FoodItems { get; set; }
        public DbSet<OrderMaster>? OrderMasters { get; set; }
        public DbSet<OrderDetail>? OrderDetails { get; set; }
    }
}
