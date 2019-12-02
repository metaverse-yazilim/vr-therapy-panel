using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;
namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class EndExpoController : ApiController
    {
        // GET: EndExpo
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int expo = formData.exposure;

                UserManager.expodone(expo);
                return JsonFunctions.JSONConvert(null);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}