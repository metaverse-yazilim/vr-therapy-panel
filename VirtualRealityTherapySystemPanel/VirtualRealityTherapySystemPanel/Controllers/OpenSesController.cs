using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Entities;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualTherapySystemPanel.Controllers
{
    public class OpenSesController : ApiController
    {
        // GET: PatientList
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int Gmt = formData.GMT != null ? Convert.ToInt16(formData.GMT) : 3;
                int docid = formData.userId;
                int remaining = UserManager.OpenSesCont(docid,Gmt);

                UserInfo returner = new UserInfo();
                returner.doctorid = remaining;

                return JsonFunctions.JSONConvert(returner);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}