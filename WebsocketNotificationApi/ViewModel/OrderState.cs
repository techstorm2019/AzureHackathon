using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class OrderState
    {
        public string OrderPrecedence { get; set; }
        public string OrderNo { get; set; }
        public string OrderStatus { get; set; }
        public int OrderStatusCount { get; set; }
    }
}
