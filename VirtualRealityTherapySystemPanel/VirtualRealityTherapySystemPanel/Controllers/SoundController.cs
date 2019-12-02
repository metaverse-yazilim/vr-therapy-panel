using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class SoundController : ApiController
    {
        // Post: SaveExpo seans sonu yorumları kaydedilecek
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int expoid = formData.expoid;
                return JsonFunctions.JSONConvert(AudioManager.GetSoundFile(expoid));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}