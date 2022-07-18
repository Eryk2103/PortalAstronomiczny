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
    public class PostCommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public PostCommentController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PostComment>>> GetPostComments(int id)
        {

            return  await _context.PostCommments.Include(u=>u.User).Where(c=>c.PostId == id).ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> AddPostComment(PostComment comment)
        {
            var user = await _userManager.FindByNameAsync(comment.UserId);
            comment.UserId = user.Id;
            comment.CommentDate = DateTime.Now;
            _context.PostCommments.Add(comment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<PostComment>> DeletePostComment(int id)
        {
            var postCom = await _context.PostCommments.FindAsync(id);
            if(postCom==null)
            {
                return NotFound();
            }
            _context.PostCommments.Remove(postCom);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
    }
}