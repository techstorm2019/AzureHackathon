using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebsocketNotificationApi;
using WebsocketNotificationApi.Repository;
using WebsocketNotificationApi.ViewModel;
using Newtonsoft.Json;

namespace NotificationApp
{
    public class NotificationHub : Hub
    {
        private static List<UserConnection> userList = new List<UserConnection>();

        public void ShipmentNotificationStart()
        {

            Clients.All.SendAsync("sendToAll", "John", "WOW");
        }

        public async Task ShipmentNotification(string name, string message)
        {

            PostRepository postRepository = new PostRepository();

            UserInfo userIfo = postRepository.GetNotificationForUser("sanjeebkr.paul@gmail.com");
            if (userIfo != null)
            {
                var connectionIDList = userList.Where(o => o.UserName == userIfo.UserID).Select(ul => ul.ConnectionID).ToList();

                await Clients.Clients(connectionIDList).SendAsync("sendToAll", userIfo.Name, userIfo.Notfications);
                // await Clients.Group("PUMA").SendAsync("sendToAll","Sanjeeb","HIIIII");
            }

        }

        public async Task LoadNotfications(string userID)
        {
            var httpCtx = Context.GetHttpContext();
            var usr = new UserConnection();
            usr.ConnectionID = Context.ConnectionId;

            usr.UserName = userID;
            usr.ConnectionID = Context.ConnectionId;
            userList.Add(usr);

            // PostRepository postRepository = new PostRepository();
            //string groupName = postRepository.GetCustomerByUser(usr.UserName);

            //usr.GroupName = groupName;

            // add in group
            //await Groups.AddToGroupAsync(usr.ConnectionID, groupName);

            PostRepository postRepository = new PostRepository();
            UserInfo userIfo = postRepository.GetNotificationForUser(userID);
            if (userIfo != null)
            {
                var connectionIDList = userList.Where(o => o.UserName == userIfo.UserID).Select(ul => ul.ConnectionID).ToList();

                await Clients.Clients(connectionIDList).SendAsync("getAllNotification", userIfo.Name, userIfo.Notfications);

                postRepository = new PostRepository();
                List<OrderStatusStatistics> orderStatusStatistics = postRepository.GetOrderStatusReport(userID);
                await Clients.Clients(connectionIDList).SendAsync("getReportData", userIfo.Name, orderStatusStatistics);

            }
        }

       // public async Task LoadReportData(string userID)
        //{
        //    PostRepository postRepository = new PostRepository();
        //    List<OrderStatusStatistics> orderStatusStatistics = postRepository.GetOrderStatusReport(userID);
        //    var connectionIDList = userList.Where(o => o.UserName == userID).Select(ul => ul.ConnectionID).ToList();

        //    await Clients.Clients(connectionIDList).SendAsync("getReportData", userID, orderStatusStatistics);
        //}

        public async Task ReadNotification(string userID, int notificationID)
        {
            PostRepository postRepository = new PostRepository();
            if (postRepository.ReadNotification(userID, notificationID))
            {
                postRepository = new PostRepository();
                UserInfo userIfo = postRepository.GetNotificationForUser(userID);
                var connectionIDList = userList.Where(o => o.UserName == userID).Select(ul => ul.ConnectionID).ToList();
                await Clients.Clients(connectionIDList).SendAsync("getAllNotification", userIfo.Name, userIfo.Notfications);
            }
        }

        public async Task LoadNotificationOnUpdateOrder(int orderID)
        {
            PostRepository postRepository = new PostRepository();
            List<string> userNotficationList = postRepository.GetUsersByOrder(orderID);
            var connectionIDList = userList.Where(o => userNotficationList.Contains(o.UserName)).Select(ul => ul.ConnectionID).ToList();
            await Clients.Clients(connectionIDList).SendAsync("getNotifiedOnOrderUpdate");
        }
        //public async Task UpdateShipmentStatus(int orderID, int notificationID, int shipmentStatusID, string notes)
        //{
        //    PostRepository postRepository = new PostRepository();
        //    Dictionary<string, string> groupMeaasge = postRepository.UpdateShipmentStatus(orderID, notificationID, shipmentStatusID, notes);
        //    if (groupMeaasge != null && groupMeaasge.Keys.Count > 0)
        //    {
        //        string grpName = groupMeaasge.ElementAt(0).Key;
        //        string message = groupMeaasge.ElementAt(0).Value;

        //        // notify to all the customer of the order
        //        await Clients.Group(grpName).SendAsync("sendToCustomers",message);

        //    }
        //}


        public override Task OnConnectedAsync()
        {
            // var httpCtx = Context.GetHttpContext();
            // var usr = new UserConnection();

            // usr.UserName = httpCtx.Request.Headers["UserId"].ToString();
            // usr.ConnectionID = Context.ConnectionId;

            // PostRepository postRepository = new PostRepository();
            // string groupName = postRepository.GetCustomerByUser(usr.UserName);

            //// usr.GroupName = groupName;

            // userList.Add(usr);

            // add in group
            // Groups.AddToGroupAsync(usr.ConnectionID, groupName);
            return base.OnConnectedAsync();
        }


        public override Task OnDisconnectedAsync(Exception exception)
        {
            string conectionID = Context.ConnectionId;
            UserConnection disconnectedUser = userList.Where(u => u.ConnectionID == conectionID).FirstOrDefault();
            if (disconnectedUser != null)
            {
                userList.Remove(disconnectedUser);
                // Groups.RemoveFromGroupAsync(conectionID, disconnectedUser.GroupName);
            }
            return base.OnDisconnectedAsync(exception);
        }

    }
}
