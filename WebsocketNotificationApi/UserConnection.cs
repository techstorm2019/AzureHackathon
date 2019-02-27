using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi
{
    public class UserConnection
    {
        public string UserName { set; get; }
        public string ConnectionID { set; get; }
        public string GroupName { get; set; }
    }
}
