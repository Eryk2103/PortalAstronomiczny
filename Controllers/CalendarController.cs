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
    public class CalendarController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public CalendarController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Calendar>>> GetCalendar()
        {
            var currentDate = new DateTime();
            return  await _context.Calendar.Where(c=>c.Date >= currentDate).ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> AddCalendar(Calendar calendar)
        {
            _context.Calendar.Add(calendar);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
    }
}