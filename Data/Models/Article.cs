using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class Article
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public virtual User User {get; set;}
        [ForeignKey("User")]
        public string UserId {get; set;}
        public string Thumbnail {get; set;}
        public string Title {get; set;}
        public string Content {get; set;}
        public bool Published {get; set;}
        public DateTime PublishDate {get; set;}
        public DateTime LastEdited {get; set;}
        
    }
}