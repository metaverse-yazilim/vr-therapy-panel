using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;


namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class SessionDeleteController : ApiController
    {
        // Post: SessionDelete
        public void Post(dynamic formData)
        {
            try
            {
                int Gmt = formData.GMT != null ? Convert.ToInt16(formData.GMT) : 3;
                int sesid = formData.sesdelid;
                int patid = formData.infoid;
                UserManager.SesDel(sesid,patid);
                UserManager.AdjustNextSession(patid, Gmt);
                
            }
            catch (Exception ex)
            {
                Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}