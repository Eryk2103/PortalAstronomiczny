using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class PostLikes
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public virtual Post Post {get; set;}
        [ForeignKey("Post")]
        public int PostId {get; set;}
        public virtual User User {get; set;}
        [ForeignKey("User")]
        public string UserId {get; set;}

    }
}