using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class CommentController : ApiController
    {
        // GET: Comment
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int time = formData.time;
                string comment = formData.comment != null && formData.comment != string.Empty ? formData.comment : string.Empty;
                int expoid = formData.exposure;

                return JsonFunctions.JSONConvert(UserManager.commentadder(comment, time, expoid));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}