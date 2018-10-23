using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using MECProject_Api.Models.ViewModels;
using MECProject_Api.Models;
using System.Data.Common;
using System.Data;
using System.Data.SqlClient;

namespace MECProject_Api.Controllers
{

    public class GetOrdersParam
    {
        public string status { get; set; }
        public int userId { get; set; }
    }

    public class OrderController : ApiController
    {
        public static bool HasColumn(DbDataReader Reader, string ColumnName)
        {
            foreach (DataRow row in Reader.GetSchemaTable().Rows)
            {
                if (row["ColumnName"].ToString() == ColumnName)
                    return true;
            } //Still here? Column not found. 
            return false;
        }

        [HttpPost]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Order/addOrder")]
        public void addOrder(OrderVM user)
        {

            string trackingid = "";
            string trackingNumber = "";
           

            var ss = DateTime.Now;
            string year = ss.Year.ToString();
            string month = ss.Month.ToString();
            string day = ss.Day.ToString();


            //string connectionString = "Data Source=(local);Initial Catalog=MECProjectDB;Integrated Security=true";
            string connectionString = "data source=184.154.206.133; initial catalog=MECProjectDB;user id=MECProjectUser; password=$Default123";



            using (SqlConnection connection =
                new SqlConnection(connectionString))
            {
                // Create the Command and Parameter objects.
                SqlCommand command = new SqlCommand("OrdertrackingNumber", connection);
                command.CommandType = CommandType.StoredProcedure;
                //command.Parameters.AddWithValue("@date", DateTime.Now);
                command.Parameters.Add(new SqlParameter("@date", SqlDbType.Date));
                command.Parameters["@date"].Value = DateTime.Now;

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    var comlumExist = HasColumn(reader, "order_ID");
                    if (comlumExist == true)
                    {


                        while (reader.Read())
                        {

                            if (reader != null)
                            {
                                var sss = reader["order_ID"];
                                var trackingNumbers = Convert.ToInt32(reader["order_number"]);
                                trackingNumbers = trackingNumbers + 1;
                                trackingNumber = trackingNumbers.ToString();
                            }


                        }
                        var length = trackingNumber.Length;
                        if (length == 1)
                        {
                            trackingNumber.Insert(0, "000");
                            trackingNumber = "000" + trackingNumber;
                        }
                        else if (length == 2)
                        {
                            trackingNumber.Insert(0, "00");
                            trackingNumber = "00" + trackingNumber;

                        }
                        else if (length == 3)
                        {
                            trackingNumber.Insert(0, "0");
                            trackingNumber = "0" + trackingNumber;
                        }
                        trackingid = year + "-" + month + "-" + day + "-" + trackingNumber;
                    }
                    else
                    {
                        trackingid = year + "-" + month + "-" + day + "-" + "0001";
                        trackingNumber = "0001";

                    }

                    reader.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }


            }
            MECProjectDBEntities tt = new MECProjectDBEntities();
            Order o = new Order();
            o.clint_name = user.clint_name;
            o.clint_phone = user.clint_phone;
            o.clint_address = user.clint_address;
            o.order_amount = Convert.ToInt32( user.order_amount);
            o.service_ID = user.service_ID;
            o.dateOfOrder = DateTime.Now;
            o.order_number = trackingNumber;
            o.trackingId = trackingid;
            o.user_ID = user.userId;
            o.order_status = "pending";
            tt.Orders.Add(o);
            tt.SaveChanges();
        }

        [HttpGet]
        //[Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Order/GetOrders/{status}/{userId}")]
        public List<OrderGridVM> GetOrders(string status, int userId)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            List <OrderGridVM> og = new List<OrderGridVM>();
            var s = t.sp_GetOrdersGrid(status,userId);
            foreach (var item in s)
            {
                OrderGridVM ogv = new OrderGridVM();
                ogv.order_ID = item.order_ID;
                ogv.dateOfOrder = Convert.ToDateTime( item.dateOfOrder);
                ogv.order_amount = Convert.ToInt32( item.order_amount);
                ogv.order_status = item.order_status;
                ogv.trackingId = item.trackingId;
                ogv.user_name = item.clint_name;
                ogv.phone = item.clint_phone;
                ogv.address = item.clint_address;
                ogv.serviceId = Convert.ToInt32( item.service_ID);
                ogv.shopkeeperName = item.user_name;
                ogv.shopkeeperId = item.user_ID;
                og.Add(ogv);
            }
            return og;
        }

        [HttpPost]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Order/Delete")]
        public void Delete(OrderGridVM p)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            Order order = new Order();
            order.dateOfOrder=p.dateOfOrder;
            order.order_amount=p.order_amount;
            order.order_status=p.order_status;
            order.trackingId=p.trackingId;
            order.order_ID = p.order_ID;
            t.Orders.Attach(order);
            t.Orders.Remove(order);
            t.SaveChanges();
        }

        [HttpPost]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Order/updateOrderStatus")]
        public void updateOrderStatus(OrderGridVM p)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            Order d = new Order();
            var dd = t.Orders.First(x => x.order_ID == p.order_ID);
            var id=Convert.ToInt32(dd.user_ID);
            var user = t.Users.Where(x=>x.user_ID==id).FirstOrDefault();
            int commision=Convert.ToInt32( user.shopkeeper_commission);
            int totalAmount=Convert.ToInt32( dd.order_amount);
            int shopkeeperAmount = (totalAmount * commision)/100;
            int adminAmout = totalAmount - shopkeeperAmount;
            dd.shopkeeper_amount = shopkeeperAmount;
            dd.Admin_amount = adminAmout;
            dd.order_status = p.order_status;
            t.SaveChanges();
        }

        [HttpPost]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Order/updateOrder")]
        public void updateOrder(OrderVM p)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            Order d = new Order();
            var dd = t.Orders.First(x => x.order_ID == p.order_ID);
            dd.clint_address = p.clint_address;
            dd.clint_name = p.clint_name;
            dd.clint_phone = p.clint_phone;
            dd.order_amount = Convert.ToInt32( p.order_amount);
            dd.order_ID = p.order_ID;
            dd.service_ID = p.service_ID;
            t.SaveChanges();
        }

        [HttpGet]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Authorize]
        [Route("api/Order/GetOrderCountByStatus/{userId}")]
        public OrderCountVM GetOrderCountByStatus(int userId)
        {
            OrderCountVM oc = new OrderCountVM();



            //string connectionString = "Data Source=(local);Initial Catalog=MECProjectDB;Integrated Security=true";
            string connectionString = "data source=184.154.206.133; initial catalog=MECProjectDB;user id=MECProjectUser; password=$Default123";



            using (SqlConnection connection =
                new SqlConnection(connectionString))
            {
                // Create the Command and Parameter objects.
                SqlCommand command = new SqlCommand("sp_GetOrderCountByStatus", connection);
                command.CommandType = CommandType.StoredProcedure;
                //command.Parameters.AddWithValue("@date", DateTime.Now);
                command.Parameters.Add(new SqlParameter("@userId", SqlDbType.Int));
                command.Parameters["@userId"].Value = userId;

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    //var comlumExist = HasColumn(reader, "order_ID");



                    while (reader.Read())
                    {

                        if (reader != null)
                        {
                            var sss = reader["pending"];
                            oc.pending =  sss.ToString();
                        }


                    }
                    reader.NextResult();


                    while (reader.Read())
                    {

                        if (reader != null)
                        {
                            var sss = reader["InProcess"];
                            oc.InProcess = sss.ToString();
                        }


                    }
                    reader.NextResult();

                    while (reader.Read())
                    {

                        if (reader != null)
                        {
                            var sss = reader["Completed"];
                            oc.Completed = sss.ToString();
                        }


                    }
                    reader.NextResult();
                    while (reader.Read())
                    {

                        if (reader != null)
                        {
                            var sss = reader["Cancelled"];
                            oc.Cancelled = sss.ToString();
                        }


                    }


                    reader.Close();
                   
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                return oc;

            }
  

        }

        [HttpGet]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Order/GetOrdersPayments/{status}/{userId}")]
        public PaymentVML GetOrdersPayments(string status, int userId)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();

            List<PaymentVM> og = new List<PaymentVM>();

            PaymentVML pml = new PaymentVML();

            int adminTotal = 0;
            int shopkeeperTotal = 0;
            //string connectionString = "Data Source=(local);Initial Catalog=MECProjectDB;Integrated Security=true";
           string connectionString = "data source=184.154.206.133; initial catalog=MECProjectDB;user id=MECProjectUser; password=$Default123";



            using (SqlConnection connection =
                new SqlConnection(connectionString))
            {
                // Create the Command and Parameter objects.
                SqlCommand command = new SqlCommand("sp_OrdersPayment", connection);
                command.CommandType = CommandType.StoredProcedure;
                //command.Parameters.AddWithValue("@date", DateTime.Now);
                command.Parameters.Add(new SqlParameter("@userId", SqlDbType.Int));
                command.Parameters["@userId"].Value = userId;
                if (status== "received")
                {
                    command.Parameters.Add(new SqlParameter("@status", SqlDbType.VarChar));
                    command.Parameters["@status"].Value = "Completed";

                }
                else
                {
                    command.Parameters.Add(new SqlParameter("@status", SqlDbType.VarChar));
                    command.Parameters["@status"].Value = status;
                }
                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                   
                    while (reader.Read())
                    {

                        if (reader != null)
                        {
                            try
                            {
                                adminTotal = Convert.ToInt32(reader["adminTotal"]);
                            }
                            catch (Exception)
                            {

                              
                            }
                            

                        }


                    }
                    reader.NextResult();

                    while (reader.Read())
                    {

                        if (reader != null)
                        {
                            try
                            {
                                shopkeeperTotal = Convert.ToInt32(reader["shopkeeperTotal"]);
                            }
                            catch (Exception)
                            {

                                
                            }
                          

                        }


                    }

                    reader.NextResult();

                    while (reader.Read())
                    {
                        PaymentVM ogv = new PaymentVM();

                        if (reader != null)
                        {
                            ogv.order_ID = Convert.ToInt32(reader["order_ID"]);
                            ogv.dateOfOrder = Convert.ToDateTime(reader["dateOfOrder"]);
                            ogv.order_amount = Convert.ToInt32(reader["order_amount"]);
                            ogv.order_status = reader["order_status"].ToString();
                            ogv.trackingId = reader["trackingId"].ToString();
                            ogv.user_name = reader["clint_name"].ToString();
                            ogv.phone = reader["clint_phone"].ToString();
                            ogv.address = reader["clint_address"].ToString();
                            ogv.serviceId = Convert.ToInt32(reader["service_ID"]);
                            try
                            {
                                if (reader["Admin_amount"] != null)
                                {
                                    if (reader["Admin_amount"] != DBNull.Value)
                                    {
                                        ogv.Admin_amount = Convert.ToInt32(reader["Admin_amount"]);
                                    }

                                }
                            }
                            catch (Exception)
                            {

                               
                            }
                            try
                            {
                                if (reader["shopkeeper_amount"] != null)
                                {
                                    if (reader["shopkeeper_amount"] != DBNull.Value)
                                    {
                                        ogv.shopkeeper_amount = Convert.ToInt32(reader["shopkeeper_amount"]);
                                    }
                                }
                            }
                            catch (Exception)
                            {

                               
                            }
                           

                            ogv.adminTotal = adminTotal;
                            ogv.shopkeeperTotal = shopkeeperTotal;
                            og.Add(ogv);
                        }


                    }
                    reader.Close();

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                

            }


            pml.paymentList = og;
            pml.adminTotal = adminTotal;
                pml.shopkeeperTotal = shopkeeperTotal;
            return pml;
        }

        [HttpPost]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Authorize]
        [Route("api/Order/addOrderCompaint")]
        public string addOrderCompaint(addcomplaintsVM p)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            var order = t.Orders.Where(x=>x.trackingId==p.ordernumber).FirstOrDefault();
            if (order != null)
            {
                Complaint d = new Complaint();
                d.order_resson = p.reason;
                d.complaint_field1 = p.ordernumber;// complaint_field1 IS THE tracking id of Order
                d.order_ID = order.order_ID;
                d.complaint_status = "pending"; 
                d.complaint_field2 = p.userId.ToString();// complaint_field2 is the userId
                t.Complaints.Add(d);
                t.SaveChanges();
                return "found";
            } else
            {
                return "notfound";
            }
        }

        [HttpGet]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Authorize]
        [Route("api/Order/GetOrderComplaints/{status}/{userId}")]
        public List<complaintsGridVM> GetOrderComplaints(string status, int userId)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();

            List<complaintsGridVM> og = new List<complaintsGridVM>();
            var objlist = t.sp_getOrdersComplaint(status, userId);
            foreach (var item in objlist)
            {
                complaintsGridVM ogv = new complaintsGridVM();
                ogv.complaintId = item.complaint_ID;
                ogv.reason = item.order_resson;
                ogv.status = item.complaint_status;
                ogv.trackingId = item.complaint_field1;
                og.Add(ogv);
            }
            return og;
        }

        [HttpPost]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Authorize]
        [Route("api/Order/updateOrdeComplaintStatus")]
        public void updateOrdeComplaintStatus(complaintsGridVM p)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            var dd = t.Complaints.First(x => x.complaint_ID == p.complaintId);
            dd.complaint_status = p.status;
            t.SaveChanges();
        }

        [HttpPost]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Order/GetOrdersPaymentsByUser")]
        public PaymentVML GetOrdersPaymentsByUser(UserPaymentModel upm)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            List<PaymentVM> og = new List<PaymentVM>();
            PaymentVML pml = new PaymentVML();
            string userId = upm.emailId;
            string status = upm.status;
            int adminTotal = 0;
            int shopkeeperTotal = 0;
            //string connectionString = "Data Source=(local);Initial Catalog=MECProjectDB;Integrated Security=true";
            string connectionString = "data source=184.154.206.133; initial catalog=MECProjectDB;user id=MECProjectUser; password=$Default123";

            using (SqlConnection connection =
                new SqlConnection(connectionString))
            {
                // Create the Command and Parameter objects.
                SqlCommand command = new SqlCommand("sp_OrdersPaymentByUsers", connection);
                command.CommandType = CommandType.StoredProcedure;
                //command.Parameters.AddWithValue("@date", DateTime.Now);
                command.Parameters.Add(new SqlParameter("@userId", SqlDbType.VarChar));
                command.Parameters["@userId"].Value = userId;
                if (status == "received")
                {
                    command.Parameters.Add(new SqlParameter("@status", SqlDbType.VarChar));
                    command.Parameters["@status"].Value = "Completed";
                }
                else
                {
                    command.Parameters.Add(new SqlParameter("@status", SqlDbType.VarChar));
                    command.Parameters["@status"].Value = status;
                }
                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        PaymentVM ogv = new PaymentVM();
                        if (reader != null)
                        {
                            ogv.order_ID = Convert.ToInt32(reader["order_ID"]);
                            ogv.dateOfOrder = Convert.ToDateTime(reader["dateOfOrder"]);
                            ogv.order_amount = Convert.ToInt32(reader["order_amount"]);
                            ogv.order_status = reader["order_status"].ToString();
                            ogv.trackingId = reader["trackingId"].ToString();
                            ogv.user_name = reader["clint_name"].ToString();
                            ogv.phone = reader["clint_phone"].ToString();
                            ogv.address = reader["clint_address"].ToString();
                            ogv.serviceId = Convert.ToInt32(reader["service_ID"]);
                            shopkeeperTotal = Convert.ToInt32(reader["totalShopkeerAmount"]);
                            try
                            {
                                if (reader["Admin_amount"] != null)
                                {
                                    if (reader["Admin_amount"] != DBNull.Value)
                                    {
                                        ogv.Admin_amount = Convert.ToInt32(reader["Admin_amount"]);
                                    }

                                }
                            }
                            catch (Exception)
                            {


                            }
                            try
                            {
                                if (reader["shopkeeper_amount"] != null)
                                {
                                    if (reader["shopkeeper_amount"] != DBNull.Value)
                                    {
                                        ogv.shopkeeper_amount = Convert.ToInt32(reader["shopkeeper_amount"]);
                                    }
                                }
                            }
                            catch (Exception)
                            {


                            }
                            ogv.adminTotal = adminTotal;
                            ogv.shopkeeperTotal = shopkeeperTotal;
                            og.Add(ogv);
                        }
                    }
                    reader.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            pml.paymentList = og;
            pml.adminTotal = adminTotal;
            pml.shopkeeperTotal = shopkeeperTotal;
            return pml;
        }
    }
}
