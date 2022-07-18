using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class Calendar
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public string Content {get; set;}
        public DateTime Date {get; set;}
        public string Tags {get; set;}
        
    }
}