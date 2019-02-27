using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebsocketNotificationApi.Common;
using WebsocketNotificationApi.Repository;
using WebsocketNotificationApi.ViewModel;

namespace WebsocketNotificationApi.Controllers
{
    [Produces("application/json")]
    public class NotificationController : Controller
    {
        [HttpGet]
        [Route("api/Notification/GetAllShipmentStatus")]
        public ActionResult GetAllShipmentStatus()
        {
            try
            {
                PostRepository postRepository = new PostRepository();
                IList<ShipmentStatusInfo> shipmentStatusInfos = postRepository.GetAllShipmentStatus();
                return Content(JsonConvert.SerializeObject(shipmentStatusInfos), "application/json", System.Text.Encoding.UTF8);
                //return Json(shipmentStatusInfos);
            }
            catch (Exception ex)
            {
                return Json(string.Format(ErrorMessages.CommonErrorMsg, ex.Message));
            }
        }
        [HttpGet]
        [Route("api/Notification/GetOrdersPerUser")]
        public async Task<ActionResult> GetOrdersPerUser(string userID)
        {
            try
            {
                PostRepository postRepository = new PostRepository();
                List<OrderInfo> orderList = postRepository.GetOrdersPerUser(userID);
                return Content(JsonConvert.SerializeObject(orderList), "application/json", System.Text.Encoding.UTF8);
            }
            catch (Exception ex)
            {
                return Json(string.Format(ErrorMessages.CommonErrorMsg, ex.Message));
            }
        }

        [HttpGet]
        [Route("api/Notification/GetOrderDetails")]
        public async Task<ActionResult> GetOrderDetails(int orderID)
        {
            try
            {
                PostRepository postRepository = new PostRepository();
                OrderInfoDetails orderInfoDetails = postRepository.GetOrderDetails(orderID);
                return Content(JsonConvert.SerializeObject(orderInfoDetails), "application/json", System.Text.Encoding.UTF8);

            }
            catch (Exception ex)
            {
                return Json(string.Format(ErrorMessages.CommonErrorMsg,ex.Message));
            }
        }
        [HttpPost]
        [Route("api/Notification/UpdateShipmentStatus")]
        public async Task<ActionResult> UpdateShipmentStatus()
        {

            using (StreamReader reader = new StreamReader(HttpContext.Request.Body))
            {
                string searchRequest = reader.ReadToEnd();
                UpdateOrderParam updateOrderParam = Newtonsoft.Json.JsonConvert.DeserializeObject<UpdateOrderParam>(searchRequest);
                PostRepository postRepository = new PostRepository();
                Dictionary<string, string> groupMeaasge = postRepository.UpdateShipmentStatus(updateOrderParam);
            }

               
            
           
            return Json("OK");
        }
    }
}