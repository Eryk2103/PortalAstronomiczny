using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class Post
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public virtual User User {get; set;}
        [ForeignKey("User")]
        public string UserId {get; set;}
        public int Likes {get; set;}
        public string Photo {get; set;}
        public string Title {get; set;}
        public string Content {get; set;}
        public DateTime DateAdded {get; set;}
        public string CelestialBoddy {get; set;}
        public virtual IList<PostLikes> LikedPosts {get; set;}
        
        
    }
}