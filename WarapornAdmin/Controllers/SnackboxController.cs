using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WarapornSarapaoAdmin.Controllers
{
    public class SnackboxController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}