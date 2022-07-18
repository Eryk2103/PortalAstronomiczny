using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class UserRoleDTO
    {
        public string UserName {get; set;}
        public string RoleName {get; set;}
        
    }
}