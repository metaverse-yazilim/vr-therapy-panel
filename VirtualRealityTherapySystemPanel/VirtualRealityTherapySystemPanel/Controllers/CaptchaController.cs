using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;
using Newtonsoft.Json;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class CaptchaController : ApiController
    {
        public bool Post(dynamic formform)
        {
            //if (string.IsNullOrEmpty(formform.deneme)) return false;

            var secret = "6LfuylsUAAAAAFwSo0sS5MuRXCY-lXzdzl-d5W7W";
            if (string.IsNullOrEmpty(secret)) return false;

            var client = new WebClient();

            var googleReply = client.DownloadString(
                $"https://www.google.com/recaptcha/api/siteverify?secret={secret}&response={formform.deneme}");

            return JsonConvert.DeserializeObject<RecaptchaResponse>(googleReply).Success;
        }
    }
}