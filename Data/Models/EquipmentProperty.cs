using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class EquipmentProperty
    {
        [Key]
        public int Id {get; set;}
        public virtual Property Property {get; set;}
        [ForeignKey("Property")]
        public int PropertyId{get; set;}
        public virtual Equipment Equipment {get; set;}
        [ForeignKey("Equipment")]
        public int EquipmentId{get; set;}
    }
}