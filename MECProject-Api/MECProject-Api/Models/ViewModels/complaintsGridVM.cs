using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MECProject_Api.Models.ViewModels
{
    public class complaintsGridVM
    {
        public int complaintId { get; set; }
        public string trackingId { get; set; }
        public string reason { get; set; }
        public string status { get; set; }
    }
}