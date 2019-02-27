using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebsocketNotificationApi.Repository;
using WebsocketNotificationApi.ViewModel;

namespace WebsocketNotificationApi.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            // PostRepository postRepository = postRepository = new PostRepository();

            //postRepository.ReadNotification("sanjeebkr.paul@gmail.com", 2);
            //postRepository =  new PostRepository();
            //List<ShipmentStatusInfo> ss = postRepository.GetAllShipmentStatus();
            //postRepository = new PostRepository();
            //List<UserInfo> uu = postRepository.GetAllUnReadNotifications();
            //postRepository = new PostRepository();
            // string customer = postRepository.GetCustomerByUser("sanjeebkr.paul@gmail.com");
            //postRepository = new PostRepository();
            //List<UserInfo> uuinfo = postRepository.GetNotificationForUser("sanjeebkr.paul@gmail.com");
            //PostRepository postRepository = new PostRepository();
            //List<string> userNotficationList = postRepository.GetUsersByOrder(1);

            PostRepository postRepository = new PostRepository();
            List<OrderStatusStatistics> orderList = postRepository.GetOrderStatusReport("sanjeebkr.paul@gmail.com");
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
