using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class UserInfo
    {
        public long ID { get; set; }
        public string UserID { get; set; }
        public string Name { get; set; }
        public List<NotificationMessage> Notfications { get; set; }
    }
}
