using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace PortalAstronomiczny.Data.Models
{
    public class MessageDTO
    {
        public string SenderUserName {get; set;}
        public string RecieverUserName {get; set;}
        public string message {get; set;}

        public DateTime date {get; set;}
    }
}