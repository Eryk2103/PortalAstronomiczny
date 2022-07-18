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
    public class MessageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public MessageController(ApplicationDbContext context,  UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        [HttpGet]
        public async Task<ActionResult<ApiResult<Messages>>> GetMessages(string userName, int pageIndex=0, int pageSize=5)
        {
            return await ApiResult<Messages>.CreateAsync( _context.Messages.Include(m=>m.Sender).Where(m=>m.Reciever.UserName==userName), pageIndex,pageSize);
            
        }
        
        
         [HttpPost]
        public async Task<IActionResult> AddMessage(MessageDTO msgDto)
        {
            var sender = await _userManager.FindByNameAsync(msgDto.SenderUserName);
            var reciever = await _userManager.FindByNameAsync(msgDto.RecieverUserName);

            var message = new Messages{
                Sender = sender,
                SenderId = sender.Id,
                Reciever = reciever,
                RecieverId = reciever.Id,
                message = msgDto.message,
                Date = msgDto.date
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
        
    }
}