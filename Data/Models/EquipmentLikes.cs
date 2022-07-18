using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class EquipmentLikes
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public virtual Equipment Equipment {get; set;}
        [ForeignKey("Equipment")]
        public int EquipmentId {get; set;}
        public virtual User User {get; set;}
        [ForeignKey("User")]
        public string UserId {get; set;}

    }
}