using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ubakip.Startup))]
namespace ubakip
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
