using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class UserPassCheckController : ApiController
    {
        // GET: UserPassCheck
        public HttpResponseMessage Post(dynamic formData)
        {
            bool smt = false;
            string Hash = formData.respasshash != null && formData.respasshash != string.Empty ? formData.respasshash : string.Empty;
            int Gmt = formData.GMT != null ? Convert.ToInt16(formData.GMT) : 3;
            smt = UserManager.PassCheck(Hash, Gmt);


            return JsonFunctions.JSONConvert(smt);
        }
    }
}