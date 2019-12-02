using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualTherapySystemPanel.Controllers
{
    public class PatloginController : ApiController
    {
        // POST: api/Login
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                string Username = formData.Username != null && formData.Username != string.Empty ? formData.Username : string.Empty;
                string Password = formData.Password != null && formData.Password != string.Empty ? formData.Password : string.Empty;

                return JsonFunctions.JSONConvert(UserManager.PatientControl(Username, Password));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}