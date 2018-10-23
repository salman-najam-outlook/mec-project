using MECProject_Api.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MECProject_Api.Controllers
{
    public class MiscController : ApiController
    {
        [HttpGet]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/Misc/GetDonorClaims")]
        [Authorize]
        public UserVM GetDonorClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;

            UserVM uvm = new UserVM()
            {
                Userid = Convert.ToInt32(identityClaims.FindFirst("Userid").Value),
                Username = identityClaims.FindFirst("Username").Value,
                Email = identityClaims.FindFirst("Email").Value,
                Phone = identityClaims.FindFirst("Phone").Value,
                Roleid = Convert.ToInt32(identityClaims.FindFirst("Roleid").Value),
                Rolename = identityClaims.FindFirst("RoleName").Value,
            };
            return uvm;
        }
    }
}
