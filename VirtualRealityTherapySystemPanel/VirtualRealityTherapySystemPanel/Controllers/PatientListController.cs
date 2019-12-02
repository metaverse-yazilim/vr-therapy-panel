using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualTherapySystemPanel.Controllers
{
    public class PatientListController : ApiController
    {
        // GET: PatientList
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int docid = formData.userId;

                int Gmt = formData.GMT != null ? Convert.ToInt16(formData.GMT) : 3;
                UserManager.HashTimeController(docid,Gmt);
                return JsonFunctions.JSONlistConvert(UserManager.GetList(docid, Gmt));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}