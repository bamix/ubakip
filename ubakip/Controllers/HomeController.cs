using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ubakip.Models;

namespace ubakip.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            List<Tag> tags = new List<Tag>();
            tags.Add(new Tag() { Name = "tag1" });
            tags.Add(new Tag() { Name = "tag2" });
            tags.Add(new Tag() { Name = "tag3" });
            User author = new User() { Nickname = "bamix", Photo = "https://pp.vk.me/c630516/v630516851/17d41/3DClFMPdBSk.jpg" };
            Post post1 = new Post()
            {
                Name = "test name",
                Author = author,
                Id=1L,
                Rating = 3.2f,
                UserRating = 2f,
                Cover = "https://pp.vk.me/c633523/v633523851/9920/E93Q5a_KRzE.jpg",
                CreateTime = DateTime.Now,
                MPAARating = new MPAARating() { Photo = "http://1.bp.blogspot.com/-w8rJ7fH6CNQ/TpusFvSdEfI/AAAAAAAAAqw/KiCGps3Cn3s/s1600/pg.png", Description = "PG" },
                Tags = tags
            };

            Post post2 = new Post()
            {
                Name = "test name",
                Author = author,
                Id = 2L,
                Rating = 3.2f,
                UserRating = 4f,
                Cover = "https://pp.vk.me/c633523/v633523851/9920/E93Q5a_KRzE.jpg",
                CreateTime = DateTime.Now,
                MPAARating = new MPAARating() { Photo = "http://1.bp.blogspot.com/-w8rJ7fH6CNQ/TpusFvSdEfI/AAAAAAAAAqw/KiCGps3Cn3s/s1600/pg.png", Description = "PG" },
                Tags = tags
            };

            Post post3 = new Post()
            {
                Name = "test name",
                Author = author,
                Id = 3L,
                Rating = 3.2f,
                UserRating = 0f,
                Cover = "https://pp.vk.me/c633523/v633523851/9920/E93Q5a_KRzE.jpg",
                CreateTime = DateTime.Now,
                MPAARating = new MPAARating() { Photo = "http://1.bp.blogspot.com/-w8rJ7fH6CNQ/TpusFvSdEfI/AAAAAAAAAqw/KiCGps3Cn3s/s1600/pg.png", Description = "PG" },
                Tags = tags
            };
            PostRepository postRepository = new PostRepository();
            postRepository.Posts.Add(post1);
            postRepository.Posts.Add(post2);
            postRepository.Posts.Add(post3);
            return View(postRepository);
        }


        public ActionResult UserInfo()
        {
            Comment comment = new Comment()
            {
                Text = "123",
                Time = DateTime.Now,
                FromUser = new User() {Nickname="bamix",Photo= "https://pp.vk.me/c630516/v630516851/17d41/3DClFMPdBSk.jpg" }
            };

            Medal medal = new Medal(){
                Description= "dsfkjsdklf",
            Photo = "/Content/Images/medal.png"
            };
            UserInfo author = new UserInfo()
            {
                FirstName = "Alex",
                LastName = "Ignatyev",
                User = new User() {
                    Nickname = "bamix",
                    Photo = "https://pp.vk.me/c630516/v630516851/17d41/3DClFMPdBSk.jpg"
                },
                About = "kek",
                Rating = 3.4f
            };
            author.Medals.Add(medal);
            author.Medals.Add(medal);
            author.Medals.Add(medal);
            author.Medals.Add(medal);
            author.Medals.Add(medal);
            author.Medals.Add(medal);
            author.Medals.Add(medal);
            author.Medals.Add(medal);
            author.Medals.Add(medal);
            author.Medals.Add(medal);
            author.Comments.Add(comment);
            author.Comments.Add(comment);
            author.Comments.Add(comment);
            author.Comments.Add(comment);
            author.Comments.Add(comment);
            author.Comments.Add(comment);
            return View(author);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }
    }
}