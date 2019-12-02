using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class PatientinfoController : ApiController
    {
        // GET: PatientList
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int patid = formData.infoid;
                int docid = formData.userId;

                int Gmt = formData.GMT != null ? Convert.ToInt16(formData.GMT) : 3;
                //string docname = "admin";
                return JsonFunctions.JSONConvert(UserManager.GetPat(patid,docid, Gmt));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}