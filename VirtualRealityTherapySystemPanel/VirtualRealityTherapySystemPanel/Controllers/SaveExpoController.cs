using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;


namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class SaveExpoController : ApiController
    {
        // Post: SaveExpo seans sonu yorumları kaydedilecek
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                string doc_c = formData.tcomment;
                string pat_c = formData.pcomment;
                int nervousness = formData.nrv;
                int confidence = formData.con;
                int patid = formData.patid;
                int docid = formData.docid;
                int ses_no = formData.ses_number;
                int expo_no = formData.expo_number;

                UserManager.expo_closer(patid, docid);
                UserManager.endexposaver(doc_c, pat_c, nervousness, confidence, patid, ses_no, expo_no);

                return JsonFunctions.JSONConvert(UserManager.endexpo_last(patid, ses_no, expo_no));
                
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}