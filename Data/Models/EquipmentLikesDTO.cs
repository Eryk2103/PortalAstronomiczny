using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class EquipmentLikesDTO
    {
        public int Id {get; set;}
        public int EquipmentId {get; set;}
        
    }
}