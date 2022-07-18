using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class Messages
    {
        [Key]
        [Required]
        public int Id {get; set;}
        public virtual User Sender {get; set;}
        [ForeignKey("Sender")]
        public string SenderId {get; set;}
        public virtual User Reciever {get; set;}
        [ForeignKey("Reciever")]
        public string RecieverId {get; set;}
        public string message {get; set;}
        public DateTime Date {get; set;}
    }
}