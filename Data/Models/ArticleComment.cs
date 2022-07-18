using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class ArticleComment : Comment
    {
        public virtual Article Article {get; set;}
        [ForeignKey("Article")]
        public int ArticleId {get; set;}
    }
}