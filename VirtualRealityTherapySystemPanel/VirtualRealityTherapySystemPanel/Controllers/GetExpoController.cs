using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class GetExpoController : ApiController
    {
        // Post: SaveExpo seans sonu yorumları kaydedilecek
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int ses_no = formData.ses_number;
                int expo_no = formData.expo_number;
                int patid = formData.patid;
                int done = formData.done;

                if (done == 0)
                {
                    int docid = formData.docid;
                    return JsonFunctions.JSONConvert(UserManager.endexpo_first(patid, ses_no, expo_no));
                }
                else
                {
                    return JsonFunctions.JSONConvert(UserManager.endexpo_last(patid, ses_no, expo_no));
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}