using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Entities;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualTherapySystemPanel.Controllers
{
    public class NewSessionController : ApiController
    {
        // Post: NewSession
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                UserInfo mrnobody = new UserInfo();
                int Gmt = formData.GMT != null ? Convert.ToInt16(formData.GMT) : 3;

                DateTime date = Convert.ToDateTime(formData.Date != null ? formData.Date : string.Empty);
                DateTime time = Convert.ToDateTime(formData.Time != null ? formData.Time : string.Empty);

                int timezone = formData.Timezone != null ? formData.Timezone : 0;
                DateTime sessionTime = time.AddMinutes(-1 * timezone);

                DateTime session = new DateTime(date.Year, date.Month, date.Day, sessionTime.Hour, sessionTime.Minute, 00);

                if (DateTime.UtcNow > session.AddMinutes(timezone))
                {
                    mrnobody.available = false;
                }
                else
                {
                    mrnobody.available = true;
                    int patid = formData.patid;
                    int docid = formData.docid;
                    UserManager.SessionAdder(patid, docid, session, Gmt);
                }

                return JsonFunctions.JSONConvert(mrnobody);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}