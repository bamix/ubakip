using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ubakip.Models
{
    public class UserInfo
    {
        public User User { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string About { get; set; }
        public float Rating { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Medal> Medals { get; set; }
        public UserInfo()
        {
            this.Comments = new List<Comment>();
            this.Medals = new List<Medal>();
        }
    }
}