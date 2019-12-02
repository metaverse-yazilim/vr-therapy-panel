using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class PatientSessionListController : ApiController
    {
        // GET: PatientSessionList
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int patid = formData.infoid;
                return JsonFunctions.JSONlistConvert(UserManager.GetSesList(patid));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}