using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MECProject_Api.Models.ViewModels
{
    public class OrderCountVM
    {
        public string pending { get; set; }
        public string InProcess { get; set; }
        public string Completed { get; set; }
        public string Cancelled { get; set; }
    }
}