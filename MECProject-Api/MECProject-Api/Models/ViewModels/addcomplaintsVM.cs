using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MECProject_Api.Models.ViewModels
{
    public class addcomplaintsVM
    {
        public string ordernumber { get; set; }
        public string reason { get; set; }
        public int userId { get; set; }
    }
}