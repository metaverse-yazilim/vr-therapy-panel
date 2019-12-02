using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;
using System.IO;
using System.Collections.Generic;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class AudioRecieverController : ApiController
    {
        public HttpResponseMessage Post(dynamic formData)
        {

            int patid = formData.patid;
            int docid = formData.docid;
            int ses_no = formData.ses_number;
            int expo_no = formData.expo_number;


            List<AudioData> audios = UserManager.GetSesAudio(patid, ses_no, expo_no);

            return JsonFunctions.JSONlistConvert(audios);
        }
    }
}