using System;
using System.Collections.Generic;

namespace WebsocketNotificationApi.Models
{
    public partial class OrderCustomerMap
    {
        public long DataUniqueId { get; set; }
        public long OrderId { get; set; }
        public long CustomerId { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public string UpdatedUser { get; set; }
        public DateTime UpdatedTime { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Order Order { get; set; }
    }
}
