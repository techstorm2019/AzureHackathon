using System;
using System.Collections.Generic;

namespace WebsocketNotificationApi.Models
{
    public partial class UserNotification
    {
        public long DataUniqueId { get; set; }
        public long UserId { get; set; }
        public long NotificationId { get; set; }
        public long OrderId { get; set; }
        public string Notes { get; set; }
        public bool? IsRead { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public string UpdatedUser { get; set; }
        public DateTime UpdatedTime { get; set; }

        public virtual Notification Notification { get; set; }
        public virtual Order Order { get; set; }
        public virtual User User { get; set; }
    }
}
