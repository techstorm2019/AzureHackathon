using System;
using System.Collections.Generic;

namespace WebsocketNotificationApi.Models
{
    public partial class Notification
    {
        public Notification()
        {
            ShipmentStatus = new HashSet<ShipmentStatus>();
            UserNotification = new HashSet<UserNotification>();
        }

        public long DataUniqueId { get; set; }
        public string Message { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public string UpdatedUser { get; set; }
        public DateTime UpdatedTime { get; set; }

        public virtual ICollection<ShipmentStatus> ShipmentStatus { get; set; }
        public virtual ICollection<UserNotification> UserNotification { get; set; }
    }
}
