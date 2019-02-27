using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebsocketNotificationApi.Models;
using WebsocketNotificationApi.ViewModel;

namespace WebsocketNotificationApi.Repository
{
    public class PostRepository
    {
        NotificationDBContext db;
        public PostRepository()
        {
            db = new NotificationDBContext();
        }

        public UserInfo GetNotificationForUser(string userID)
        {

            UserInfo userInfo = new UserInfo();
            try
            {
                userInfo = (from u in db.User
                            where u.EmailId == userID
                            select new UserInfo
                            {
                                ID = u.DataUniqueId,
                                Name = u.Name,
                                UserID = u.EmailId,
                                Notfications = (from un in db.UserNotification
                                                join n in db.Notification on un.NotificationId equals n.DataUniqueId
                                                join o in db.Order on un.OrderId equals o.DataUniqueId
                                                where un.UserId == u.DataUniqueId && un.IsRead == false
                                                select new NotificationMessage
                                                {
                                                    ID = n.DataUniqueId,
                                                    Message =string.Concat(n.Message," ",un.Notes) ,
                                                    OrderNo = o.OrderNo,
                                                    UpdatedDate = un.UpdatedTime
                                                }).OrderByDescending(nm => nm.UpdatedDate).ToList<NotificationMessage>()

                            }).FirstOrDefault();

                return userInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                db.Dispose();
            }
        }

        public Dictionary<string, string> UpdateShipmentStatus(UpdateOrderParam updateOrderParam)
        {
            Dictionary<string, string> groupMeaasge = new Dictionary<string, string>();
            try
            {
                List<UserNotificationMessage> userNotifications = new List<UserNotificationMessage>();

                using (db)
                {
                    using (var dbcxtransaction = db.Database.BeginTransaction())
                    {
                        try
                        {
                            var order = db.Order.Where(o => o.DataUniqueId == updateOrderParam.orderID).FirstOrDefault();
                            if (order != null)
                            {
                                // set all previous shipment details iscurrent to false (if any)
                                var shipmentOrderStatusDetailList = db.OrderShipmentStatusDetails.Where(os => os.OrderId == updateOrderParam.orderID).ToList();
                                if (shipmentOrderStatusDetailList != null && shipmentOrderStatusDetailList.Count > 0)
                                {
                                    foreach (OrderShipmentStatusDetails orderShpDtl in shipmentOrderStatusDetailList)
                                    {
                                        orderShpDtl.IsCurrentStatus = false;
                                        orderShpDtl.UpdatedUser = "ADMIN";
                                        orderShpDtl.UpdatedTime = DateTime.Now;

                                    }
                                    db.SaveChanges();
                                }

                                // Add new shipment status 
                                OrderShipmentStatusDetails orderShpDtlNew = new OrderShipmentStatusDetails();
                                orderShpDtlNew.OrderId = updateOrderParam.orderID;
                                orderShpDtlNew.ShipmentStatusId = updateOrderParam.shipmentStatusID;
                                orderShpDtlNew.Notes = updateOrderParam.notes;
                                orderShpDtlNew.IsCurrentStatus = true;
                                orderShpDtlNew.CreatedUser = "ADMIN";
                                orderShpDtlNew.CreatedTime = DateTime.Now;
                                orderShpDtlNew.UpdatedUser = "ADMIN";
                                orderShpDtlNew.UpdatedTime = DateTime.Now;

                                db.OrderShipmentStatusDetails.Add(orderShpDtlNew);

                                // get notification details by shipment status

                                var notfication = db.ShipmentStatus.Where(s => s.DataUniqueId == updateOrderParam.shipmentStatusID).Select(s1 => s1.Notification).FirstOrDefault();
                                long notificationID = 0;
                                string notificationMeaasge = string.Empty;
                                if (notfication != null)
                                {
                                    notificationID = notfication.DataUniqueId;
                                    notificationMeaasge = notfication.Message;
                                }

                                // get all users for notification
                                var userList = (from o in db.Order
                                                join c in db.Customer on o.CustomerId equals c.DataUniqueId
                                                join u in db.User on c.DataUniqueId equals u.CustomerId
                                                where o.DataUniqueId == updateOrderParam.orderID
                                                select u.DataUniqueId
                                   ).ToList();

                                foreach (int userDataUniqueID in userList)
                                {
                                    UserNotification userNotification = new UserNotification();
                                    userNotification.UserId = userDataUniqueID;
                                    userNotification.NotificationId = notificationID;
                                    userNotification.OrderId = updateOrderParam.orderID;
                                    userNotification.IsRead = false;
                                    userNotification.Notes = updateOrderParam.notes;
                                    userNotification.CreatedUser = "ADMIN";
                                    userNotification.CreatedTime = DateTime.Now;
                                    userNotification.UpdatedUser = "ADMIN";
                                    userNotification.UpdatedTime = DateTime.Now;
                                    db.UserNotification.Add(userNotification);

                                }

                                // get customer of order
                                string cutomer = db.Customer.Where(c => c.DataUniqueId == order.CustomerId).Select(cc => cc.Name).FirstOrDefault();

                                if (!groupMeaasge.ContainsKey(cutomer))
                                    groupMeaasge.Add(cutomer, notificationMeaasge);

                                // update order status
                                order.OrderStatus = db.ShipmentStatus.Where(s => s.DataUniqueId == updateOrderParam.shipmentStatusID).Select(ss => ss.Status).FirstOrDefault();
                                order.UpdatedTime = DateTime.Now;
                                order.UpdatedUser = "ADMIN";
                                db.SaveChanges();
                                dbcxtransaction.Commit();
                            }
                        }
                        catch (Exception x)
                        {

                            dbcxtransaction.Rollback();
                            throw x;
                        }
                    }
                }

                return groupMeaasge;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                db.Dispose();
            }

        }

        public bool ReadNotification(string userID, int notificationID)
        {
            bool suceess = false;
            try
            {
                var userNotification = db.UserNotification.Where(un => un.User.EmailId == userID && un.NotificationId == notificationID && un.IsRead == false).FirstOrDefault();
                if (userNotification != null)
                {
                    userNotification.IsRead = true;
                    db.SaveChanges();
                }

                suceess = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                db.Dispose();
            }
            return suceess;
        }

        public List<UserInfo> GetAllUnReadNotifications()
        {

            List<UserInfo> userInfo = new List<UserInfo>();
            try
            {
                userInfo = (from u in db.User
                            join un in db.UserNotification on u.DataUniqueId equals un.UserId
                            where un.IsRead == false
                            select new UserInfo
                            {
                                ID = u.DataUniqueId,
                                Name = u.Name,
                                UserID = u.EmailId,
                                Notfications = (from n in db.Notification
                                                where n.DataUniqueId == un.NotificationId
                                                select new NotificationMessage
                                                {
                                                    ID = n.DataUniqueId,
                                                    Message = string.Concat(n.Message, " ", un.Notes)
                                                }).ToList<NotificationMessage>()

                            }).ToList();



                return userInfo;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                db.Dispose();
            }
        }

        public List<ShipmentStatusInfo> GetAllShipmentStatus()
        {
            List<ShipmentStatusInfo> shipmentStatuses = new List<ShipmentStatusInfo>();
            try
            {
                shipmentStatuses = (from st in db.ShipmentStatus
                                    select new ShipmentStatusInfo
                                    {
                                        ID = st.DataUniqueId,
                                        Status = st.Status,
                                        Precedense = st.Precedense

                                    }).ToList();

                return shipmentStatuses;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public string GetCustomerByUser(string userId)
        {
            string customerName = string.Empty;
            try
            {
                customerName = db.User.Where(u => u.EmailId == userId).Select(c => c.Customer.Name).FirstOrDefault();
                return customerName;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                db.Dispose();
            }
        }
        public List<OrderInfo> GetOrdersPerUser(string userID)
        {
            List<OrderInfo> orderList = new List<OrderInfo>();
            try
            {
                orderList = (from u in db.User
                             join c in db.Customer on u.CustomerId equals c.DataUniqueId
                             join o in db.Order on c.DataUniqueId equals o.CustomerId
                             where u.EmailId == userID
                             select new OrderInfo
                             {
                                 ID = o.DataUniqueId,
                                 OrderNo = o.OrderNo,
                                 OrderDetails = o.OrderDetails,
                                 ShipmentStaus = o.OrderStatus,
                                 IsDelay = o.IsDelay != null ? Convert.ToBoolean(o.IsDelay) : false,
                                 Customer = c.Name

                             }
                             ).ToList<OrderInfo>();

                return orderList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                db.Dispose();
            }
        }

        public OrderInfoDetails GetOrderDetails(int orderID)
        {
            OrderInfoDetails orderInfoDetails = new OrderInfoDetails();
            try
            {
                OrderInfo order = (from o in db.Order
                                   join c in db.Customer on o.CustomerId equals c.DataUniqueId
                                   where o.DataUniqueId == orderID
                                   select new OrderInfo
                                   {
                                       ID = o.DataUniqueId,
                                       Customer = c.Name,
                                       IsDelay = o.IsDelay != null ? Convert.ToBoolean(o.IsDelay) : false,
                                       OrderNo = o.OrderNo,
                                       OrderDetails = o.OrderDetails,
                                       ShipmentStaus = o.OrderStatus,
                                   }).FirstOrDefault();

                if (order != null)
                {
                    List<OrderShipmentStatus> OrderShipmentStatusList = (from ost in db.OrderShipmentStatusDetails
                                                                         join s in db.ShipmentStatus on ost.ShipmentStatusId equals s.DataUniqueId
                                                                         join n in db.Notification on s.NotificationId equals n.DataUniqueId
                                                                         where ost.OrderId == orderID
                                                                         select new OrderShipmentStatus
                                                                         {
                                                                             ID = ost.DataUniqueId,
                                                                             ShipmentStatusID = s.DataUniqueId,
                                                                             ShipmentStatus = s.Status,
                                                                             ShipmentStatusMessage = string.Concat(n.Message, " ", ost.Notes),
                                                                             IsCurrentStatus = ost.IsCurrentStatus != null ? Convert.ToBoolean(ost.IsCurrentStatus) : false,
                                                                             CretedDate = ost.CreatedTime,
                                                                             UpdatedDate = ost.UpdatedTime
                                                                         }).ToList<OrderShipmentStatus>();

                    orderInfoDetails.Order = order;
                    orderInfoDetails.OrderShipmentStatusList = OrderShipmentStatusList;
                }



                //orderInfoDetails = (from o in db.Order
                //                    join c in db.Customer on o.CustomerId equals c.DataUniqueId
                //                    where o.DataUniqueId == orderID
                //                    select new OrderInfoDetails
                //                    {
                //                        Order = {
                //                            ID =o.DataUniqueId,
                //                            Customer =c.Name,
                //                            IsDelay = o.IsDelay!=null? Convert.ToBoolean(o.IsDelay):false,
                //                            OrderNo = o.OrderNo,
                //                            OrderDetails = o.OrderDetails},
                //                        OrderShipmentStatusList = (from ost in db.OrderShipmentStatusDetails
                //                                                   join s in db.ShipmentStatus on ost.ShipmentStatusId equals s.DataUniqueId
                //                                                   join n in db.Notification on s.NotificationId equals n.DataUniqueId
                //                                                   where ost.OrderId == orderID
                //                                                   select new OrderShipmentStatus
                //                                                   {
                //                                                       ID = ost.DataUniqueId,
                //                                                       ShipmentStatus = s.Status,
                //                                                       ShipmentStatusMessage = string.Concat(n.Message, " ", ost.Notes),
                //                                                       IsCurrentStatus = ost.IsCurrentStatus != null ? Convert.ToBoolean(ost.IsCurrentStatus) : false,
                //                                                       CretedDate = ost.CreatedTime,
                //                                                       UpdatedDate = ost.UpdatedTime
                //                                                   }).ToList<OrderShipmentStatus>()
                //                    }).FirstOrDefault();

                return orderInfoDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                db.Dispose();
            }
        }

        public List<string> GetUsersByOrder(int orderID)
        {
            List<string> userList = new List<string>();
            try
            {
                userList = (from o in db.Order
                            join c in db.Customer on o.CustomerId equals c.DataUniqueId
                            join u in db.User on c.DataUniqueId equals u.CustomerId
                            where o.DataUniqueId == orderID
                            select u.EmailId).ToList<string>();
                return userList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                db.Dispose();
            }
        }

        public List<OrderStatusStatistics> GetOrderStatusReport(string userID)
        {
            List<OrderStatusStatistics> orderStatusStatisticsList = new List<OrderStatusStatistics>();
            try
            {
                int totalOrderCount = (from o in db.Order
                                       join u in db.User on o.CustomerId equals u.CustomerId
                                       where u.EmailId == userID
                                       select o.OrderNo).Count();


                List<OrderState> orderStateList = (from o in db.Order
                                                   join u in db.User on o.CustomerId equals u.CustomerId
                                                   where u.EmailId == userID
                                                   select new OrderState
                                                   {
                                                       OrderNo = o.OrderNo,
                                                       OrderStatus = o.OrderStatus
                                                   }).OrderBy(oo => oo.OrderStatus).ToList();

                List<OrderState> orderStateListNew = orderStateList.GroupBy(o => o.OrderStatus).Select(x => new OrderState
                {
                    OrderStatus = x.Key,
                    OrderStatusCount = x.Count()
                }).ToList();

                foreach (OrderState orderState in orderStateListNew)
                {
                    OrderStatusStatistics orderStatusStatistics = new OrderStatusStatistics();
                    orderStatusStatistics.OrderStatus = orderState.OrderStatus;
                    orderStatusStatistics.OrderStatusCount = orderState.OrderStatusCount;
                    orderStatusStatistics.TotalOrderCount = totalOrderCount;
                    orderStatusStatistics.OrderStatusPercentage = ((100 * orderState.OrderStatusCount) / totalOrderCount);

                    if (!orderStatusStatisticsList.Contains(orderStatusStatistics))
                        orderStatusStatisticsList.Add(orderStatusStatistics);
                }
                
                return orderStatusStatisticsList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                db.Dispose();
            }
        }

    }
}

