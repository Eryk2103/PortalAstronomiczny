using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class PostCommmentDTO 
    {       
        public int Id {get; set;}
        public virtual User User {get; set;}
        public string UserId {get; set;}
        public int? ParentCommentId {get; set;}
        public virtual PostComment ParentComment {get; set;}
        public string Content {get; set;}
        public DateTime CommentDate {get; set;}
        public int Likes {get; set;}
        public virtual Post Post {get; set;}
        public int PostId {get; set;}
    }
}