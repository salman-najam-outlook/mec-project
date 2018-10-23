using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MECProject_Api.Models.ViewModels;
namespace MECProject_Api.Models.ViewModels
{
    public class PaymentVML
    {
        public List<PaymentVM> paymentList = new List<PaymentVM>();
        public int adminTotal { get; set; }
        public int shopkeeperTotal { get; set; }
    }
}