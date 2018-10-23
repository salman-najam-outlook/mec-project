using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MECProject_Api.Models.ViewModels
{
    public class PaymentVM
    {
        public int Admin_amount { get; set; }
        public int shopkeeper_amount { get; set; }
        public int order_ID { get; set; }
        public string trackingId { get; set; }
        public DateTime dateOfOrder { get; set; }
        public string user_name { get; set; }
        public int order_amount { get; set; }
        public string order_status { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public int serviceId { get; set; }
        public int adminTotal { get; set; }
        public int shopkeeperTotal { get; set; }
    }
}