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
    public class PostController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public PostController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        [HttpGet]
        public async Task<ActionResult<ApiResult<Post>>> GetPosts(string equipment=null, int  pageIndex = 0, int pageSize = 5, string sortColumn=null, string sortOrder=null, string filterColumn=null, string filterQuery=null)
        {
            
            if(equipment!=null){
                var equipmentToFilter = equipment.Split(","); 
                IQueryable<Post> source = _context.Posts;
                var pe = await _context.PostEquipment.Include(pe=>pe.Equipment).Where(pe=>equipmentToFilter.Contains(pe.Equipment.Name)).GroupBy(p=>p.PostId).Where(p=>p.Count() == equipmentToFilter.Length ).Select(pe=>pe.Key).ToListAsync();
                source = source.Where(p=>pe.Contains(p.Id));
                return  await ApiResult<Post>.CreateAsync(source, pageIndex,pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
            }
            return  await ApiResult<Post>.CreateAsync(_context.Posts, pageIndex,pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPost(int id)
        {
            
            var postEq = await _context.PostEquipment.Include(x=>x.Equipment).Where(x=>x.PostId == id).Select(x=>x.Equipment).ToListAsync();
            var post = await _context.Posts.Include(x=>x.User).FirstOrDefaultAsync(x=>x.Id==id);


            if (postEq == null)
            {
                return NotFound();
            }        
            var postDto = new PostDTO{
                Id = post.Id,
                UserId = post.UserId,
                UserName = post.User.UserName,
                Likes = post.Likes,
                Photo = post.Photo,
                Title = post.Title,
                Content = post.Content,
                DateAdded = post.DateAdded,
                CelestialBoddy = post.CelestialBoddy,
                Equipment = postEq

            };

            return postDto;
        }
        [HttpPut]
        public async Task<IActionResult> PutPost(Post post)
        {
            
            _context.Entry(post).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            { 
                   return StatusCode(500, $"Internal server error: {e}");
                
            }

            return NoContent();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, PostDTO postDTO)
        {
            if (id != postDTO.Id)
            {
                return BadRequest();
            }
            var post = new Post {
                Id = postDTO.Id,
                UserId = postDTO.UserId,
                Likes = postDTO.Likes,
                Photo = postDTO.Photo,
                Title = postDTO.Title,
                Content = postDTO.Content,
                DateAdded = postDTO.DateAdded,
                CelestialBoddy = postDTO.CelestialBoddy
            };
            _context.Entry(post).State = EntityState.Modified;


            var pe = await _context.PostEquipment.Where(x=>x.PostId == postDTO.Id).ToListAsync();
            foreach(var item in pe)
            {
                _context.PostEquipment.Remove(item);
            }
                
            foreach (var eq in postDTO.Equipment)
            {
                if(!_context.Equipment.Any(x=>x.Name==eq.Name))
                    _context.Equipment.Add(eq);

                await _context.SaveChangesAsync();

                var eq2 = await _context.Equipment.Where(x=>x.Name == eq.Name).FirstOrDefaultAsync();
                    var pe2 = new PostEquipment{
                        PostId = post.Id,
                        Post = post,
                        Equipment = eq2,
                        EquipmentId = eq2.Id
                    };
                    _context.PostEquipment.Add(pe2);
            }
            await _context.SaveChangesAsync();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPost]
        public async Task<IActionResult> PostPost(PostDTO postDTO)
        {
            var user = await _userManager.FindByNameAsync(postDTO.UserId);

            var post = new Post {
                Id = postDTO.Id,
                UserId = user.Id,
                Likes = postDTO.Likes,
                Photo = postDTO.Photo,
                Title = postDTO.Title,
                Content = postDTO.Content,
                DateAdded = DateTime.Now,
                CelestialBoddy = postDTO.CelestialBoddy
            };
        
            _context.Posts.Add(post);

            foreach(var eq in postDTO.Equipment)
            {
                var eq2 = await _context.Equipment.Where(x=>x.Id == eq.Id).FirstOrDefaultAsync();
                var pe = new PostEquipment{
                        PostId = post.Id,
                        Post = post,
                        Equipment = eq2,
                        EquipmentId = eq2.Id
                    };
                    _context.PostEquipment.Add(pe);
                
                 await _context.SaveChangesAsync();

            }
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Post>> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if(post==null)
            {
                return NotFound();
            }
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }
    }
}