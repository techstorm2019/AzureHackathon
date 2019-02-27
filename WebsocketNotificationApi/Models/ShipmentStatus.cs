using System;
using System.Collections.Generic;

namespace WebsocketNotificationApi.Models
{
    public partial class ShipmentStatus
    {
        public ShipmentStatus()
        {
            OrderShipmentStatusDetails = new HashSet<OrderShipmentStatusDetails>();
        }

        public long DataUniqueId { get; set; }
        public string Status { get; set; }
        public int Precedense { get; set; }
        public long? NotificationId { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public string UpdatedUser { get; set; }
        public DateTime UpdatedTime { get; set; }

        public virtual Notification Notification { get; set; }
        public virtual ICollection<OrderShipmentStatusDetails> OrderShipmentStatusDetails { get; set; }
    }
}
