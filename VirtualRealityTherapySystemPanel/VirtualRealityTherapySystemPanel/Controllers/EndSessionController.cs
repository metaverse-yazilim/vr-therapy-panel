using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class EndSessionController : ApiController
    {
        // GET: EndSession

        public HttpResponseMessage Post(dynamic formData)
        {
            int Gmt = formData.GMT != null ? Convert.ToInt16(formData.GMT) : 3;

            int pat_no = formData.patid;
            int ses_no = formData.sesid;
            int doc_no = formData.docid;
            int remaining = UserManager.sessiondone(pat_no, ses_no, doc_no, Gmt);

            return JsonFunctions.JSONConvert(remaining);
        }
    }
}