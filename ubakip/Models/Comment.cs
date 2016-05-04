using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ubakip.Models
{
    public class Comment
    {
        public string Text { get; set; }
        public User FromUser { get; set; } 
        public User ToUser { get; set; }  
        public DateTime Time { get; set; }          
    }
}