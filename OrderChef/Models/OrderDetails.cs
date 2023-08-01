using System.ComponentModel.DataAnnotations;

namespace OrderChef.Models
{
    public class OrderDetail
    {
        [Key]
        public int OrderDetailId { get; set; }

        public int OrderMasterId { get; set; }
        public OrderMaster? OrderMaster { get; set; }
        public int FoodItemId { get; set; }
        public FoodItem? FoodItem { get; set; }
        public decimal FoodItemPrice { get; set; }
        public decimal Quantity { get; set; }

    }
}
