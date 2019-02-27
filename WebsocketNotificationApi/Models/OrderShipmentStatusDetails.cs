using System;
using System.Collections.Generic;

namespace WebsocketNotificationApi.Models
{
    public partial class OrderShipmentStatusDetails
    {
        public long DataUniqueId { get; set; }
        public long OrderId { get; set; }
        public long ShipmentStatusId { get; set; }
        public string Notes { get; set; }
        public bool? IsCurrentStatus { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public string UpdatedUser { get; set; }
        public DateTime UpdatedTime { get; set; }

        public virtual Order Order { get; set; }
        public virtual ShipmentStatus ShipmentStatus { get; set; }
    }
}
