using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Entities;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualTherapySystemPanel.Controllers
{
    public class LoginController : ApiController
    {
        // POST: api/Login
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                string Username = formData.Username != null && formData.Username != string.Empty ? formData.Username : string.Empty;
                string Password = formData.Password != null && formData.Password != string.Empty ? formData.Password : string.Empty;

                //List<AudioData> audios= UserManager.GetSesAudio();

                return JsonFunctions.JSONConvert(UserManager.userControl(Username, Password));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}