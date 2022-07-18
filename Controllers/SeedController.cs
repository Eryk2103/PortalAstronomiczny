using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PortalAstronomiczny.Data;
using Microsoft.EntityFrameworkCore;
using System.Security;
using PortalAstronomiczny.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace PortalAstronomiczny.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;
        

        public SeedController(ApplicationDbContext context, RoleManager<IdentityRole> roleManager, UserManager<User> userManager) 
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<ActionResult> CreateDefaultUsers()
        {
        
            string role_RegisteredUser = "RegisteredUser";
            string role_Administrator = "Administrator";
            string role_Redactor = "Redactor";

            if (await _roleManager.FindByNameAsync(role_RegisteredUser) == null)
            {
                await _roleManager.CreateAsync(new IdentityRole(role_RegisteredUser));
            }
            if (await _roleManager.FindByNameAsync(role_Administrator) == null)
            {
                await _roleManager.CreateAsync(new IdentityRole(role_Administrator));
            }
            if (await _roleManager.FindByNameAsync(role_Redactor) == null)
            {
                await _roleManager.CreateAsync(new IdentityRole(role_Redactor));
            }
            var addedUserList = new List<User>();
            var email_Admin = "admin@email.com";

            if(await _userManager.FindByNameAsync(email_Admin) == null)
            {
                var user_Admin = new User()
                {
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "Admin",
                    Email = email_Admin,
                };
                await _userManager.CreateAsync(user_Admin, "MySecr3t$");

                await _userManager.AddToRoleAsync(user_Admin, role_Administrator);

                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;

                addedUserList.Add(user_Admin);
            }
            
            await _context.SaveChangesAsync();
            
            return new JsonResult(new {
                Users = addedUserList
            });
            
        }
    }
}