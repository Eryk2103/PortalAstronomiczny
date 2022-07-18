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
    public class EquipmentLikesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public EquipmentLikesController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipmentLikesDTO>>> GetEqLikeByName(string name)
        {
            var user = await _userManager.FindByNameAsync(name);
            return  await _context.EquipmentLikes.Where(u=>u.UserId==user.Id).Select(p=> new EquipmentLikesDTO() {Id = p.Id, EquipmentId=p.EquipmentId}).ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> AddEqLike(EquipmentLikes pl)
        {
            var user = await _userManager.FindByNameAsync(pl.UserId);
            pl.UserId=user.Id;
            pl.User=user;
            _context.EquipmentLikes.Add(pl);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<EquipmentLikes>> DeleteEqLike(int id)
        {
            var like = await _context.EquipmentLikes.FindAsync(id);
            if(like==null)
            {
                return NotFound();
            }
            _context.EquipmentLikes.Remove(like);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        
    }
}