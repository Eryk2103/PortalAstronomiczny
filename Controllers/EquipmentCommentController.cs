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
    public class EquipmentCommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public EquipmentCommentController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<EquipmentComment>>> GetEquipmentComments(int id)
        {

            return  await _context.EquipmentComments.Include(u=>u.User).Where(c=>c.EquipmentId == id).ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> AddEquipmentComment(EquipmentComment comment)
        {
            var user = await _userManager.FindByNameAsync(comment.UserId);
            comment.UserId = user.Id;
            comment.CommentDate = DateTime.Now;
            _context.EquipmentComments.Add(comment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<EquipmentComment>> DeleteEqComment(int id)
        {
            var eq = await _context.EquipmentComments.FindAsync(id);
            if(eq==null)
            {
                return NotFound();
            }
            _context.EquipmentComments.Remove(eq);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
    }
}