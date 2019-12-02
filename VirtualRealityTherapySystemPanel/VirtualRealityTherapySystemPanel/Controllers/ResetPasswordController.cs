using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using System.Web;
using System.Net.Mail;
using System.Text;
using System.IdentityModel.Tokens;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class ResetPasswordController : ApiController
    {
        // POST: ResetPassword
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                string email = formData.email != null && formData.email != string.Empty ? formData.email : string.Empty;
                
                bool check = UserManager.EmailControl(email);
                
                int Gmt = formData.GMT != null ? Convert.ToInt16(formData.GMT) : 3;

                if (check == true) {
                    //FOR EMAİL START
                    string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                    SmtpClient client = new SmtpClient();
                    client.Port = 587;
                    client.Host = "mail.metaverse.com.tr";
                    client.EnableSsl = false;
                    client.Timeout = 10000;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("support@metaverse.com.tr", "MEtvrs18");

                    MailMessage mm = new MailMessage("support@metaverse.com.tr", email);
                    string subject = "VRET-Social Şifre Yenileme";
                    string url = "http://vret-social.com/#/resetpassword/";
                    string text = "Şifrenizi bu <a href='" + url + token + "'>link</a> aracılığıyla değiştirebilirsiniz. <br /> Linkin geçerlilik süresi 24 saattir.";

                    mm.IsBodyHtml = true;
                    mm.Body = text;
                    mm.Subject = subject;
                    mm.BodyEncoding = UTF8Encoding.UTF8;
                    mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

                    client.Send(mm);
                    UserManager.TokenInsert(token,email, Gmt);
                    //FOR EMAİL END
                }
                return JsonFunctions.JSONConvert(check);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}