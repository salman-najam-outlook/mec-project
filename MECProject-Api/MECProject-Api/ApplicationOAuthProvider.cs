using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Threading.Tasks;
using MECProject_Api.Models;

// Installing Command of CORS: Install-Package Microsoft.AspNet.WebApi.Cors -Version 5.2.6
// Microsoft ASP.NET Identity Owin
// Microsoft.Owin.Host.SystemWeb
// Microsoft.Owin.Cors

namespace MECProject_Api
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            using (var db = new MECProjectDBEntities())
            {
                if (db != null)
                {
                    User user = db.Users.Where(u => u.user_email == context.UserName && u.user_password == context.Password && u.userStatus != "pending").FirstOrDefault();
                    if (user != null)
                    {
                        Role userRole = db.Roles.Where(r => r.role_ID == user.role_ID).FirstOrDefault();

                        {
                            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                            identity.AddClaim(new Claim("Userid", user.user_ID.ToString()));
                            identity.AddClaim(new Claim("Username", user.user_name));
                            identity.AddClaim(new Claim("Email", user.user_email));
                            identity.AddClaim(new Claim("Phone", user.user_phone));
                            identity.AddClaim(new Claim("Roleid", user.role_ID.ToString()));
                            identity.AddClaim(new Claim("RoleName", userRole.role_name));
                            context.Validated(identity);
                        }
                    }
                    else
                    {
                        context.SetError("invalid_grant", "Provided username and password is incorrect.");
                        context.Rejected();
                    }
                    return;
                }
            }
        }
    }
}