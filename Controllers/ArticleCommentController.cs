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
    public class ArticleCommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public ArticleCommentController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ArticleComment>>> GetArticleComments(int id)
        {

            return  await _context.ArticleComments.Include(u=>u.User).Where(c=>c.ArticleId == id).ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> AddArticleComment(ArticleComment comment)
        {
            var user = await _userManager.FindByNameAsync(comment.UserId);
            comment.UserId = user.Id;
            comment.CommentDate = DateTime.Now;
            _context.ArticleComments.Add(comment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArticleComment>> DeleteArticleComment(int id)
        {
            var articleCom = await _context.ArticleComments.FindAsync(id);
            if(articleCom==null)
            {
                return NotFound();
            }
            _context.ArticleComments.Remove(articleCom);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}