using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class Comment
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public virtual User User {get; set;}
        [ForeignKey("User")]
        public string UserId {get; set;}
        public int? ParentCommentId {get; set;}
        public string Content {get; set;}
        public DateTime CommentDate {get; set;}
    }
}