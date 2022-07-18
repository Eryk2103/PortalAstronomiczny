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
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public CategoryController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            
            return  await _context.Category.ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> AddCategory(Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
    }
}