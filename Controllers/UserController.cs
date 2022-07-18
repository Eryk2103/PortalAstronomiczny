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
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public UserController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        [HttpGet]
        public async Task<ActionResult> GetUserInfo(string name)
        {

            var user = await _userManager.FindByNameAsync(name);
            if(user==null)
                return NotFound();
            var roles = await _userManager.GetRolesAsync(user);;
            return Ok(roles);
        }
        [HttpPost]
        public async Task<ActionResult> ChangeUserRole(UserRoleDTO newUserRole)
        {
            var user = await _userManager.FindByNameAsync(newUserRole.UserName);

            if(user == null)
                return NotFound();
            try{
                var roles = await _userManager.GetRolesAsync(user);
                await _userManager.RemoveFromRolesAsync(user, roles.ToArray());

                await _userManager.AddToRoleAsync(user, newUserRole.RoleName);
                
            }
            catch (Exception e)
            { 
                   return StatusCode(500, $"Internal server error: {e}");
                
            }

            return Ok();
        }
        
    }
}