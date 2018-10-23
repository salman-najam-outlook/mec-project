using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MECProject_Api.Models.ViewModels
{
    public class UserVM
    {
        public int Userid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int Roleid { get; set; }
        public string Rolename { get; set; }
    }
}