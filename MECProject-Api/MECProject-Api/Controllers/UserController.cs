using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using MECProject_Api.Models.ViewModels;
using MECProject_Api.Models;
using System.Net.Mail;
using System.Data.Common;
using System.IO;
using System.Web.Hosting;
using System.IO.Compression;
using Microsoft.SqlServer.Server;

namespace MECProject_Api.Controllers
{
    public class UserController : ApiController
    {
        [HttpPost]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/registerUser")]
        public void registerUser(addUserVM user)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            User u = new User();
            u.shopkeeper_bank_account = user.accountnumber;
            u.shopkeeper_bank_branch = user.bankbranch;
            u.shopkeeper_bank_name = user.bankname;
            u.shopkeeper_commission = user.commission.ToString();
            u.shopkeeper_fname = user.username;
            u.shopkeeper_shopaddress = user.shopaddress;
            u.shopkeeper_shopname = user.shopname;
            u.user_email = user.email;
            u.user_name = user.username;
            u.user_password = user.password;
            u.user_phone = user.phone;
            u.cnic = user.cnic;
            u.city = user.city;
            u.role_ID = 3;
            u.userStatus = "pending";
            t.Users.Add(u);
            t.SaveChanges();
        }

        [HttpGet]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/GetPendingUsers")]
        public List<addUserVM> GetPendingUsers()
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            List<addUserVM> og = new List<addUserVM>();
            var s = t.Users.Where(x => x.userStatus == "pending");
            foreach (var item in s)
            {
                addUserVM a = new addUserVM();
                a.accountnumber = item.shopkeeper_bank_account;
                a.bankbranch = item.shopkeeper_bank_branch;
                a.bankname = item.shopkeeper_bank_name;
                a.commission = Convert.ToInt32(item.shopkeeper_commission);
                a.email = item.user_email;
                a.password = item.user_password;
                a.phone = item.user_phone;
                a.shopaddress = item.shopkeeper_shopaddress;
                a.shopname = item.shopkeeper_shopname;
                a.username = item.user_name;
                a.status = item.userStatus;
                a.userId = item.user_ID;
                og.Add(a);
            }
            return og;
        }

        [HttpPost]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/updateUserStatus")]
        public void updateUserStatus(addUserVM p)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            User d = new User();
            var dd = t.Users.First(x => x.user_ID == p.userId);
            dd.userStatus = p.status;
            t.SaveChanges();
            //string url = "http://electricianpk.com";
            //For to send an email at Gmail Starts: gmail ID: setting link: https://myaccount.google.com/lesssecureapps?pli=1
            //var fromAddress = new MailAddress("electricianpk.se@gmail.com", "ElectricianPK");
            //var toAddress = new MailAddress(dd.user_email, "ElectricianPK");
            //const string fromPassword = "bilalmec";
            //const string subject = "Your account has been Approved!";
            //string body = "Dear " + dd.user_name + ", \r\n \r\n" +
            //    "This is to inform you that your account has been approved! " +
            //    "\r\n\r\nYour provided credentials are mentioned below:" +
            //    "\r\nEmail: " + dd.user_email +
            //    "\r\nPassword: " + dd.user_password +
            //    "\r\n\r\nPlease signin with your given credentials at: " + url +
            //    "\r\n \r\n \r\n \r\nBest Regards,\r\n ElectricianPK Team";
            //var smtp = new SmtpClient
            //{
            //    Host = "smtp.gmail.com",
            //    Port = 587,
            //    EnableSsl = true,
            //    DeliveryMethod = SmtpDeliveryMethod.Network,
            //    Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
            //    Timeout = 20000
            //};
            //using (var message = new MailMessage(fromAddress, toAddress)
            //{
            //    Subject = subject,
            //    Body = body
            //})
            //{
            //    smtp.Send(message);
            //}
            //For to send an email at Gmail Ends
        }

        [HttpGet]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/getProfileDetails/{id}")]
        public addUserVM getProfileDetails(int id)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            addUserVM profileModel = new addUserVM();
            var approvedShopkeeper = t.Users.First(x => x.user_ID == id);
            profileModel.userId = approvedShopkeeper.user_ID;
            profileModel.username = approvedShopkeeper.user_name;
            profileModel.email = approvedShopkeeper.user_email;
            profileModel.phone = approvedShopkeeper.user_phone;
            profileModel.password = approvedShopkeeper.user_password;
            profileModel.shopname = approvedShopkeeper.shopkeeper_shopname;
            profileModel.shopaddress = approvedShopkeeper.shopkeeper_shopaddress;
            profileModel.bankname = approvedShopkeeper.shopkeeper_bank_name;
            profileModel.bankbranch = approvedShopkeeper.shopkeeper_bank_branch;
            profileModel.accountnumber = approvedShopkeeper.shopkeeper_bank_account;
            profileModel.commission = Convert.ToInt32(approvedShopkeeper.shopkeeper_commission);
            return profileModel;
        }

        [HttpGet]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/getAllUsers/{roleId}")]
        public List<User> getAllUsers(int roleId)
        {
            List<User> users = new List<User>();
            if (roleId == 1)
            {
                MECProjectDBEntities t = new MECProjectDBEntities();
                users = (from u in t.Users where u.userStatus != "pending" && u.role_ID == 3 select u).ToList();
                return users;
            }
            else
            {
                return users;
            }
        }

        [HttpPost]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/updateProfileDetails")]
        public bool updateProfileDetails(addUserVM updatedUserProfile)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            addUserVM profileModel = new addUserVM();
            User userProfileToUpdate = t.Users.First(x => x.user_ID == updatedUserProfile.userId);
            userProfileToUpdate.user_name = updatedUserProfile.username;
            userProfileToUpdate.user_name = updatedUserProfile.username;
            userProfileToUpdate.user_phone = updatedUserProfile.phone;
            userProfileToUpdate.user_password = updatedUserProfile.password;
            userProfileToUpdate.shopkeeper_shopname = updatedUserProfile.shopname;
            userProfileToUpdate.shopkeeper_shopaddress = updatedUserProfile.shopaddress;
            userProfileToUpdate.shopkeeper_bank_name = updatedUserProfile.bankname;
            userProfileToUpdate.shopkeeper_bank_branch = updatedUserProfile.bankbranch;
            userProfileToUpdate.shopkeeper_bank_account = updatedUserProfile.accountnumber;
            t.SaveChanges();
            return true;
        }

        [HttpPost]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/updateUserDetails")]
        public bool updateUserDetails(User userNewDetails)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            User userToUpdate = t.Users.First(x => x.user_ID == userNewDetails.user_ID);
            userToUpdate.shopkeeper_bank_account = userNewDetails.shopkeeper_bank_account.TrimEnd();
            userToUpdate.shopkeeper_bank_branch = userNewDetails.shopkeeper_bank_branch.TrimEnd();
            userToUpdate.shopkeeper_bank_name = userNewDetails.shopkeeper_bank_name.TrimEnd();
            userToUpdate.shopkeeper_commission = userNewDetails.shopkeeper_commission.TrimEnd();
            userToUpdate.user_phone = userNewDetails.user_phone.TrimEnd();
            userToUpdate.shopkeeper_shopaddress = userNewDetails.shopkeeper_shopaddress.TrimEnd();
            userToUpdate.shopkeeper_shopname = userNewDetails.shopkeeper_shopname.TrimEnd();
            userToUpdate.user_name = userNewDetails.user_name.TrimEnd();
            t.SaveChanges();
            return true;
        }

        [HttpPost]
        [Authorize]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/User/deleteUser")]
        public Boolean deleteUser(User user)
        {
            MECProjectDBEntities t = new MECProjectDBEntities();
            User userToDelete = t.Users.First(x => x.user_ID == user.user_ID);
            t.Users.Remove(userToDelete);
            t.SaveChanges();
            return true;
        }

        [HttpPost]
        [Route("api/User/HasEmailRegistered")]
        public bool HasEmailRegistered(EmailModel email)
        {
            using (MECProjectDBEntities dal = new MECProjectDBEntities())
            {
                User user = (from u in dal.Users where u.user_email == email.emailid select u).FirstOrDefault();
                if (user == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }

    }
}