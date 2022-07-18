using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class Category
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public int? ParentCategoryId {get; set;}
        public string Name {get; set;}
    }
}