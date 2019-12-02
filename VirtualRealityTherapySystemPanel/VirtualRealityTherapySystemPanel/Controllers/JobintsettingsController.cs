using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;
using System.Collections.Generic;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class JobintsettingsController : ApiController
    {
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                Random random = new Random();
                string avatar1 = "";
                string place = "İş Mülakatı";
                string initial = "9";
                string patientposition = "1";

                char koltuk1 = formData.koltuk1;
                char koltuk2 = formData.koltuk2;
                char koltuk3 = formData.koltuk3;
                if (koltuk3 == 'D')
                {
                    patientposition = "0";
                }

                int patid = formData.patid;
                int sesid = formData.sesid;
                int docid = formData.userId;

                int attitude = formData.condition;
                string control = formData.control;
                int age = formData.age;
                
                switch (koltuk1)
                {
                    case 'K':
                        if (age == 0)
                        {
                            avatar1 = Convert.ToString(random.Next(18, 21));
                        }
                        else if(age == 1)
                        {
                            avatar1 = Convert.ToString(random.Next(21, 24));
                        }
                        else
                        {
                            avatar1 = Convert.ToString(random.Next(24, 27));
                        }
                        break;

                    case 'E':
                        if (age == 0)
                        {
                            avatar1 = "0" + Convert.ToString(random.Next(0, 3));
                        }
                        else if (age == 1)
                        {
                            avatar1 = "0" + Convert.ToString(random.Next(3, 6));
                        }
                        else
                        {
                            avatar1 = "0" + Convert.ToString(random.Next(6, 9));
                        }
                        break;

                    default :
                        avatar1 = "36";
                        break;
                }

                attitude = attitude + 5121;
                string attitudelast = Convert.ToString(attitude);

                initial = initial + avatar1 + patientposition + control;
                
                List<String> returner = new List<string>();
                UserManager.SessionDoner(sesid, patid);
                returner.Add(UserManager.ExposureAdder(patid, initial, attitudelast, place, docid));
                returner.Add(avatar1);
                return JsonFunctions.JSONConvert(returner);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}