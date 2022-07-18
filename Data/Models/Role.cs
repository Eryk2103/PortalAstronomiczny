using Microsoft.AspNetCore.Identity;
using System;

namespace PortalAstronomiczny.Data.Models
{
    public class Role : IdentityRole<int>
    {
            public RoleValue RoleValue {get; set;}

            public Role(){}
            public Role(string name, RoleValue value) : base(name)
            {
                this.RoleValue = value;
            }
    }
}