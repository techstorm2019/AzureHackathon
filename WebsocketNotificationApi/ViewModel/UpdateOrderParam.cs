using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class UpdateOrderParam
    {
        public int orderID { get; set; }
        public int shipmentStatusID { get; set; }
        public string notes { get; set; }
    }
}
