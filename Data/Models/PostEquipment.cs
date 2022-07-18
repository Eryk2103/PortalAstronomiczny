using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class PostEquipment
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public virtual Post Post {get; set;}
        [ForeignKey("Post")]
        public int PostId {get; set;}
        public virtual Equipment Equipment {get; set;}
        [ForeignKey("Equipment")]
        public int EquipmentId {get; set;}

    }
}