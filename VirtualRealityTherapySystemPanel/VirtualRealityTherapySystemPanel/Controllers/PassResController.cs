using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class PassResController : ApiController
    {
        // GET: PassRes
        public HttpResponseMessage Post(dynamic formData)
        {
            bool smt = false;
            string Token = formData.respasshash != null && formData.respasshash != string.Empty ? formData.respasshash : string.Empty;
            string Password = formData.Password != null && formData.Password != string.Empty ? formData.Password : string.Empty;

            UserManager.PassChange(Token, Password);
            UserManager.HashErase(Token);

            return JsonFunctions.JSONConvert(smt);
        }
    }
}