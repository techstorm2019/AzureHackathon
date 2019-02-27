using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class ShipmentStatusInfo
    {
        public long ID { get; set; }
        public string Status { get; set; }
        public int Precedense { get; set; }
    }
}
