using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using System.Diagnostics;

namespace VirtualTherapySystemPanel.Controllers
{
    public class PatregController : ApiController
    {
        // GET: Register
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                DateTime birth = Convert.ToDateTime(formData.Birth != null ? formData.Birth : string.Empty);
                string Username = formData.Username != null && formData.Username != string.Empty ? formData.Username : string.Empty;
                string Password = formData.Password != null && formData.Password != string.Empty ? formData.Password : string.Empty;
                string Gender = formData.Gender != null && formData.Gender != string.Empty ? formData.Gender : string.Empty;
                string Email = formData.Email != null && formData.Email != string.Empty ? formData.Email : string.Empty;
                string Description = formData.description != null && formData.description != string.Empty ? formData.description : string.Empty;
                int docid = formData.docid ;
                return JsonFunctions.JSONConvert(UserManager.PatientRegister(Username, Password, Description, docid,birth, Gender, Email));
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}