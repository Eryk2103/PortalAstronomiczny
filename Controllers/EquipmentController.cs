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
    public class EquipmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public EquipmentController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        [HttpGet]
        public async Task<ActionResult<ApiResult<Equipment>>> GetAllEquipment(int pageIndex = 0, int pageSize = 0, string sortColumn=null, string sortOrder=null, string filterColumn=null, string filterQuery=null)
        {

            return  await ApiResult<Equipment>.CreateAsync( _context.Equipment.Include(e=>e.Category), pageIndex,pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Equipment>> GetEquipment(int id)
        {
            var eq = await _context.Equipment
                .FindAsync(id);
            

            if (eq == null)
            {
                return NotFound();
            }        
            return eq;
        }
         [HttpPost]
        public async Task<ActionResult<Equipment>> AddEquipment(Equipment eq)
        {
            if(!_context.Equipment.Any(e=>e.Name==eq.Name))
            {
                _context.Equipment.Add(eq);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return Problem();
            
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEq(int id, Equipment eq)
        {
            if (id != eq.Id)
            {
                return BadRequest();
            }
            var post = new Equipment {
                Id = eq.Id,
                Likes = eq.Likes,
                Name = eq.Name
            };
            _context.Entry(post).State = EntityState.Modified;

            
            await _context.SaveChangesAsync();
           

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Equipment>> DeleteEquipment(int id)
        {
            var eq = await _context.Equipment.FindAsync(id);
            if(eq==null)
            {
                return NotFound();
            }
            _context.Equipment.Remove(eq);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
    }
}