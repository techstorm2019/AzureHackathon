using System;
using System.Collections.Generic;

namespace WebsocketNotificationApi.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Order = new HashSet<Order>();
            User = new HashSet<User>();
        }

        public long DataUniqueId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string EmailId { get; set; }
        public string CreatedUser { get; set; }
        public DateTime CreatedTime { get; set; }
        public string UpdatedUser { get; set; }
        public DateTime UpdatedTime { get; set; }

        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
