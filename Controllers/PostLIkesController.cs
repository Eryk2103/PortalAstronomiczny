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
    public class PostLikesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public PostLikesController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostLikesDTO>>> GetPostLikeByName(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            return  await _context.PostLikes.Where(u=>u.UserId==user.Id).Select(p=> new PostLikesDTO() {Id = p.Id, PostId=p.PostId}).ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> AddPostLike(PostLikes pl)
        {
            var user = await _userManager.FindByNameAsync(pl.UserId);
            pl.UserId=user.Id;
            

            _context.PostLikes.Add(pl);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<PostLikes>> DeletePostLike(int id)
        {
            var like = await _context.PostLikes.FindAsync(id);
            if(like==null)
            {
                return NotFound();
            }
            _context.PostLikes.Remove(like);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        
    }
}