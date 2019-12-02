using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class SessionEditController : ApiController
    {
        // POST: SessionEdit
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int Gmt = formData.GMT != null ? Convert.ToInt16(formData.GMT) : 3;

                DateTime date = Convert.ToDateTime(formData.Date != null ? formData.Date : string.Empty);
                DateTime time = Convert.ToDateTime(formData.Time != null ? formData.Time : string.Empty);

                int timezone = formData.Timezone != null ? formData.Timezone : 0;
                DateTime sessionTime = time.AddMinutes(-1 * timezone);

                DateTime session = new DateTime(date.Year, date.Month, date.Day, sessionTime.Hour, sessionTime.Minute, 00);

                UserInfo mrsomebody = new UserInfo();

                if (DateTime.UtcNow > session.AddMinutes(timezone))
                {
                    mrsomebody.available = false;
                }
                else
                {
                    //hasan
                    mrsomebody.available = true;

                    int patid = formData.infoid;
                    int sesid = formData.editid;
                    UserManager.SesEdit(session, sesid);
                    UserManager.AdjustNextSession(patid, Gmt);
                }

                return JsonFunctions.JSONConvert(mrsomebody);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}