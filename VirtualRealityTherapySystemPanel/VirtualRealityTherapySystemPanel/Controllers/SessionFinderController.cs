using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using System.Web.Mvc;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class SessionFinderController : ApiController
    {
        // GET: SessionFinder
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int sesid = formData.sesid;
                int dummy = 0;

                dummy = UserManager.SessionFinder(sesid);

                return JsonFunctions.JSONConvert(dummy);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}