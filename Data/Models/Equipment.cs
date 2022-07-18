using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class Equipment
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public string Name {get; set;}
        public int Likes {get; set;}
        public virtual Category Category {get; set;}
        [ForeignKey("Category")]
        public int CategoryId {get; set;}
        public string Specification {get; set;}
        public IList<EquipmentLikes> LikedEquipment {get; set;}
    }
}