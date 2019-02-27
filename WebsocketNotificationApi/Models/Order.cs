using System;
using System.Collections.Generic;

namespace WebsocketNotificationApi.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderShipmentStatusDetails = new HashSet<OrderShipmentStatusDetails>();
            UserNotification = new HashSet<UserNotification>();
        }

        public long DataUniqueId { get; set; }
        public string OrderNo { get; set; }
        public string OrderDetails { get; set; }
        public long CustomerId { get; set; }
        public bool? IsDelay { get; set; }
        public string OrderStatus { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public string UpdatedUser { get; set; }
        public DateTime UpdatedTime { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual ICollection<OrderShipmentStatusDetails> OrderShipmentStatusDetails { get; set; }
        public virtual ICollection<UserNotification> UserNotification { get; set; }
    }
}
