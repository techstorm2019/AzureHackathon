using System;
using System.Collections.Generic;

namespace WebsocketNotificationApi.Models
{
    public partial class User
    {
        public User()
        {
            UserNotification = new HashSet<UserNotification>();
        }

        public long DataUniqueId { get; set; }
        public string Name { get; set; }
        public string EmailId { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public long CustomerId { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public string UpdatedUser { get; set; }
        public DateTime UpdatedTime { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual ICollection<UserNotification> UserNotification { get; set; }
    }
}
