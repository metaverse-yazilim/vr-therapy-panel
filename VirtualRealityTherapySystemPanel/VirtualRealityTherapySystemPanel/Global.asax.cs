using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;

namespace VirtualRealityTherapySystemPanel
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
        //private const string ROOT_DOCUMENT = "/index.html";

        //protected void Application_BeginRequest(Object sender, EventArgs e)
        //{
        //    string url = Request.Url.LocalPath;
        //    if (!System.IO.File.Exists(Context.Server.MapPath(url)))
        //        Context.RewritePath(ROOT_DOCUMENT);
        //}
    }

}