using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class PostDTO
    {
        public int Id {get; set;}
        public string UserId {get; set;}
        public string UserName {get; set;}
        public int Likes {get; set;}
        public string Photo {get; set;}
        public string Title {get; set;}
        public string Content {get; set;}
        public DateTime DateAdded {get; set;}
        public string CelestialBoddy {get; set;}

        public List<Equipment> Equipment {get; set;}
        
    }
}