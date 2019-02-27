using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class OrderStatusStatistics
    {
        public int TotalOrderCount { get; set; }
        public string OrderStatus { get; set; }
        public int OrderStatusCount { get; set; }
        public decimal OrderStatusPercentage { get; set; }
    }
}
