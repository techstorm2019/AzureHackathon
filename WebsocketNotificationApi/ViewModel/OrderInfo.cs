using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class OrderInfo
    {
        public long ID { get; set; }
        public string OrderNo { get; set; }
        public string OrderDetails { get; set; }
        public string Customer { get; set; }
        public string ShipmentStaus { get; set; }
        public bool IsDelay { get; set; }

    }
}
