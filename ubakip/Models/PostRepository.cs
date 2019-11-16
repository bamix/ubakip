using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ubakip.Models
{
    public class PostRepository
    {
        public List<Post> Posts { get; set; }
        public List<Tag> Tags { get; set; }

       public PostRepository()
        {
            this.Posts = new List<Post>();
            this.Tags = new List<Tag>();
        }
    }
}