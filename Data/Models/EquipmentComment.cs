using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class EquipmentComment : Comment
    {
        public virtual Equipment Equipment {get; set;}
        [ForeignKey("Equipment")]
        public int EquipmentId {get; set;}
    }
}