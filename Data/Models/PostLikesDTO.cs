using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class PostLikesDTO
    {
        public int Id {get; set;}
        public int PostId {get; set;}
        
    }
}