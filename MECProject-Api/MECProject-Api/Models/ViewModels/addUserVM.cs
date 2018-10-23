using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MECProject_Api.Models.ViewModels
{
    public class addUserVM
    {
        public int userId { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string password { get; set; }
        public string shopname { get; set; }
        public string shopaddress { get; set; }
        public string bankname { get; set; }
        public string bankbranch { get; set; }
        public string accountnumber { get; set; }
        public int commission { get; set; }
        public int userstatus { get; set; }
        public string status { get; set; }
        public string cnic { get; set; }
        public string city { get; set; }
    }
}