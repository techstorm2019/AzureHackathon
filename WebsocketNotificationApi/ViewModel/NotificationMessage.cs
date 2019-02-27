using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class NotificationMessage
    {
        public long ID { get; set; }
        public string Message { get; set; }
        public string OrderNo { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
