using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class OrderInfoDetails
    {
        public OrderInfo Order { get; set; }
        public List<OrderShipmentStatus> OrderShipmentStatusList { get; set; }
    }
}
