using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MECProject_Api.Models.ViewModels
{
    public class OrderVM
    {
        public string clint_name { get; set; }
        public string clint_phone { get; set; }
        public string clint_address { get; set; }
        public int service_ID { get; set; }
        public string order_amount { get; set; }
        public int order_ID { get; set; }
        public int userId { get; set; }
    }
}