using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class UserNotificationMessage
    {
        public long UserID { get; set; }
        public string Name { get; set; }
        public string UserEmailID { get; set; }
        public long NotificationID { get; set; }
        public string NotificationMeassge { get; set; }
    }
}
