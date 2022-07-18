using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace PortalAstronomiczny.Data.Models
{
    public class User : IdentityUser
    {
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public DateTime RegistrationDate {get; set;}
        public string Info {get; set;}
        public virtual IList<Post> Posts {get; set;}
        public virtual IList<PostLikes> LikedPosts {get; set;}
        public virtual IList<Article> Articles {get ;set;}
        public IList<EquipmentLikes> LikedEquipment {get; set;}
        

    }
}