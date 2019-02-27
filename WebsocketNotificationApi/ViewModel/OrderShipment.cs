using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebsocketNotificationApi.ViewModel
{
    public class OrderShipmentStatus
    {
        public long ID { get; set; }
        public long ShipmentStatusID { get; set; }
        public string ShipmentStatus  { get; set; }
        public string ShipmentStatusMessage { get; set; }
        public DateTime CretedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsCurrentStatus { get; set; }
    }
}
