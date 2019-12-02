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
    public class AcintsettingsController : ApiController
    {
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                Random random = new Random();
                int randomnumber = random.Next(0, 30);
                string avatar1 = "";
                string avatar2 = "";
                string avatar3 = "";
                string place = "Akademik Mülakat";
                string initial = "3";

                int e = 0;
                int k = 0;
                //koltuk1 cinsiyet tanımı
                char koltuk1 = formData.koltuk1;
                if (koltuk1 == 'E')
                {
                    e = e + 1;
                }
                else if (koltuk1 == 'K')
                {
                    k = k + 1;
                }
                else if (koltuk1 == 'T')
                {
                    avatar1 = "36";
                }
                else
                {
                    avatar1 = "-1";
                }

                //koltuk2 cinsiyet tanımı
                char koltuk2 = formData.koltuk2;
                if (koltuk2 == 'E')
                {
                    e = e + 1;
                }
                else if (koltuk2 == 'K')
                {
                    k = k + 1;
                }
                else if (koltuk2 == 'T')
                {
                    avatar2 = "36";
                }
                else
                {
                    avatar2 = "-1";
                }

                //koltuk3 cinsiyet tanımı
                char koltuk3 = formData.koltuk3;
                if (koltuk3 == 'E')
                {
                    e = e + 1;
                }
                else if (koltuk3 == 'K')
                {
                    k = k + 1;
                }
                else if (koltuk3 == 'T')
                {
                    avatar3 = "36";
                }
                else
                {
                    avatar3 = "-1";
                }

                string gender = Convert.ToString(e) + Convert.ToString(k);


                int patid = formData.patid;
                int sesid = formData.sesid;
                int docid = formData.userId;
                string attitude = Convert.ToString(formData.conditions) + Convert.ToString(formData.conditionr) + Convert.ToString(formData.conditionu) + Convert.ToString(formData.conditionn);
                string control = formData.control;
                int age = formData.age;
                List<Int32> avatarlist = new List<Int32>();

                string attitudelast = UserManager.attitudefinder(attitude);
                if (age == 1)
                {
                    avatarlist = UserManager.youngavatar(gender, randomnumber);
                }
                else if (age == 2)
                {
                    avatarlist = UserManager.middleavatar(gender, randomnumber);
                }
                else
                {
                    avatarlist = UserManager.oldavatar(gender, randomnumber);
                }


                if (koltuk1 == 'E')
                {
                    randomnumber = random.Next(0, e);
                    avatar1 = Convert.ToString((avatarlist[randomnumber]+9));
                    if (avatar1 == "9")
                    {
                        avatar1 = "09";
                    }
                    avatarlist.RemoveAt(randomnumber);
                    e = e - 1;
                }
                else if (koltuk1 == 'K')
                {
                    randomnumber = random.Next(e, e + k);
                    avatar1 = Convert.ToString((avatarlist[randomnumber] + 9));
                    avatarlist.RemoveAt(randomnumber);
                    k = k - 1;
                }

                if (koltuk2 == 'E')
                {
                    randomnumber = random.Next(0, e);
                    avatar2 = Convert.ToString((avatarlist[randomnumber] + 9));
                    if (avatar2 == "9")
                    {
                        avatar2 = "09";
                    }
                    avatarlist.RemoveAt(randomnumber);
                    e = e - 1;
                }
                else if (koltuk2 == 'K')
                {
                    randomnumber = random.Next(e, e + k);
                    avatar2 = Convert.ToString((avatarlist[randomnumber] + 9));
                    avatarlist.RemoveAt(randomnumber);
                    k = k - 1;
                }

                if (koltuk3 == 'E' || koltuk3 == 'K')
                {
                    avatar3 = Convert.ToString((avatarlist[0] + 9));
                    if (avatar3 == "9")
                    {
                        avatar3 = "09";
                    }
                }

                attitudelast = "5" + attitudelast;
                initial = initial + avatar1 + avatar2 + avatar3 + control;

                List<String> returner = new List<string>();
                UserManager.SessionDoner(sesid, patid);
                returner.Add(UserManager.ExposureAdder(patid, initial, attitudelast, place, docid));
                if(avatar1 == "-1")
                {
                    avatar1 = "99";
                }
                if (avatar2 == "-1")
                {
                    avatar2 = "99";
                }
                if (avatar3 == "-1")
                {
                    avatar3 = "99";
                }
                returner.Add(avatar1);
                returner.Add(avatar2);
                returner.Add(avatar3);

                return JsonFunctions.JSONConvert(returner);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}