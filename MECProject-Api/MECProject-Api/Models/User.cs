//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MECProject_Api.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public int user_ID { get; set; }
        public string user_name { get; set; }
        public string user_email { get; set; }
        public string user_phone { get; set; }
        public string user_password { get; set; }
        public string shopkeeper_fname { get; set; }
        public string shopkeeper_shopname { get; set; }
        public string shopkeeper_shopaddress { get; set; }
        public string shopkeeper_bank_name { get; set; }
        public string shopkeeper_bank_branch { get; set; }
        public string shopkeeper_bank_account { get; set; }
        public string shopkeeper_commission { get; set; }
        public Nullable<int> role_ID { get; set; }
        public string userStatus { get; set; }
        public string cnic { get; set; }
        public string city { get; set; }
    }
}
