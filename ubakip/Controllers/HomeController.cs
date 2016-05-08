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

        public ActionResult ComicsView()
        {
            List<Tag> tags = new List<Tag>();
            tags.Add(new Tag() { Name = "tag1" });
            tags.Add(new Tag() { Name = "tag2" });
            tags.Add(new Tag() { Name = "tag3" });
            User author = new User() { Nickname = "bamix", Photo = "https://pp.vk.me/c630516/v630516851/17d41/3DClFMPdBSk.jpg" };
            Post post = new Post()
            {
                Name = "test name",
                Author = author,
                Id = 1L,
                Rating = 3.2f,
                UserRating = 2f,
                Cover = "https://pp.vk.me/c633523/v633523851/9920/E93Q5a_KRzE.jpg",
                CreateTime = DateTime.Now,
                MPAARating = new MPAARating() { Photo = "http://1.bp.blogspot.com/-w8rJ7fH6CNQ/TpusFvSdEfI/AAAAAAAAAqw/KiCGps3Cn3s/s1600/pg.png", Description = "PG" },
                Tags = tags
            };
            Page page1 = new Page() { Preview = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Petit_Sammy_%C3%A9ternue.jpg/275px-Petit_Sammy_%C3%A9ternue.jpg" };
            Page page2 = new Page() { Preview = "http://znayka.org.ua/uploads/6fd0644155/e83218673d.jpg" };
            Page page3 = new Page() { Preview = "http://www.gamer.ru/system/attached_images/images/000/339/387/normal/stalkerlegend-ucoz-ru_rdr_comix_04.jpg" };
            Page page4 = new Page() { Preview = "http://acomics.ru/upload/!c/!import/jonbot-vs-martha/000008-3iey7amix7.jpg" };
            Page page5 = new Page() { Preview = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRNb62B-C8g7TUICBBygWgMyfNyLkIvs2Fg6VBYr00rE4Szuhw4" };
            post.Pages.Add(page1);
            post.Pages.Add(page2);
            post.Pages.Add(page3);
            post.Pages.Add(page4);
            post.Pages.Add(page5);
            return View(post);
        }

        public ActionResult ComicsMaker()
        {          
            return View();
        }

        [HttpPost]
        public ActionResult LoadTemplate(string id)
        {            
            return PartialView("templates/"+id);
        }
    }
}