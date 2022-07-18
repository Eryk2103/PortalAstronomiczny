using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class PostComment : Comment
    {
        public virtual Post Post {get; set;}
        [ForeignKey("Post")]
        public int PostId {get; set;}
    }
}