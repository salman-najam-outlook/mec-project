using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MECProject_Api.Models.ViewModels;
using System.Security.Claims;

namespace MECProject_Api.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "MECProject-API";
            return View();
        }

    }
}
