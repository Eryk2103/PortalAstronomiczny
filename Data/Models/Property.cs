using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class Property
    {
        [Key]
        public int Id{get; set;}
        public string Name {get; set;}
        public string Value {get; set;}
    }
}