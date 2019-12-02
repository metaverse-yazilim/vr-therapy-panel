using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using System.Diagnostics;

namespace VirtualTherapySystemPanel.Controllers
{
    public class RegisterController : ApiController
    {
        // GET: Register
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                string Username = formData.Username != null && formData.Username != string.Empty ? formData.Username : string.Empty;
                string Password = formData.Password != null && formData.Password != string.Empty ? formData.Password : string.Empty;
                string Firstname = formData.Firstname != null && formData.Firstname != string.Empty ? formData.Firstname : string.Empty;
                string Lastname = formData.Lastname != null && formData.Lastname != string.Empty ? formData.Lastname : string.Empty;
                string Email = formData.Email != null && formData.Email != string.Empty ? formData.Email : string.Empty;
                string Key = formData.Key != null && formData.Key != string.Empty ? formData.Key : string.Empty;

                return JsonFunctions.JSONConvert(UserManager.UserRegister(Firstname, Lastname, Username, Password, Email, Key));
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}