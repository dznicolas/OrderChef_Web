using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrderChef.Models
{
    public class OrderMaster
    {
        [Key]
        public int OrderMasterId { get; set; }

        [Column(TypeName = "nvarchar(75)")]
        public string? OrderNumber { get; set; }
        public int CustomerId { get; set; }

        //Navigation FK Customer
        public Customer? Customer { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string? Method { get; set;}
        public decimal Total { get; set; }

        // lets you store multiple OrderDetail objects related to a master order.
        public List<OrderDetail>? OrderDetails { get; set; }

        [NotMapped]
        public string? DeletedOrderItemIds { get; set; }

    }
}
