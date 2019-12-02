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
    public class Amfi50settingsController : ApiController
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
                string avatar4 = "";
                string avatar5 = "";
                string place = "Akademik Sunum";
                string initial = "5";

                string gender = "";

                string crowd = Convert.ToString(formData.crowd);
                int genderpercent = formData.gender;
                int age = formData.age;

                switch (genderpercent)
                {
                    case 0:
                        gender = "05";
                        break;
                    case 1:
                        gender = "14";
                        break;
                    case 2:
                        if (random.Next(0, 2) == 1)
                        {
                            gender = "32";
                        }
                        else
                        {
                            gender = "23";
                        }
                        break;
                    case 3:
                        gender = "41";
                        break;
                    case 4:
                        gender = "50";
                        break;
                }

                int patid = formData.patid;
                int sesid = formData.sesid;
                int docid = formData.userId;

                string attitude = Convert.ToString(formData.conditions) + Convert.ToString(formData.conditionr) + Convert.ToString(formData.conditionu) + Convert.ToString(formData.conditionn);
                string control = formData.control;

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

                randomnumber = random.Next(0, 5);
                avatar1 = Convert.ToString((avatarlist[randomnumber] + 9));
                avatarlist.RemoveAt(randomnumber);
                if (avatar1 == "9")
                {
                    avatar1 = "09";
                }

                randomnumber = random.Next(0, 4);
                avatar2 = Convert.ToString((avatarlist[randomnumber] + 9));
                avatarlist.RemoveAt(randomnumber);
                if (avatar2 == "9")
                {
                    avatar2 = "09";
                }

                randomnumber = random.Next(0, 3);
                avatar3 = Convert.ToString((avatarlist[randomnumber] + 9));
                avatarlist.RemoveAt(randomnumber);
                if (avatar3 == "9")
                {
                    avatar3 = "09";
                }

                randomnumber = random.Next(0, 2);
                avatar4 = Convert.ToString((avatarlist[randomnumber] + 9));
                avatarlist.RemoveAt(randomnumber);
                if (avatar4 == "9")
                {
                    avatar4 = "09";
                }

                avatar5 = Convert.ToString((avatarlist[0] + 9));
                avatarlist.RemoveAt(0);
                if (avatar5 == "9")
                {
                    avatar5 = "09";
                }

                attitudelast = "5" + attitudelast;
                string gendertemp = Convert.ToString(genderpercent);
                initial = initial + avatar1 + avatar2 + avatar3 + avatar4 + avatar5 + control + crowd + gendertemp + Convert.ToString(age);
                List<String> returner = new List<string>();
                UserManager.SessionDoner(sesid, patid);
                returner.Add(UserManager.ExposureAdder(patid, initial, attitudelast, place, docid));
                returner.Add(avatar1);
                returner.Add(avatar2);
                returner.Add(avatar3);
                returner.Add(avatar4);
                returner.Add(avatar5);
                return JsonFunctions.JSONConvert(returner);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}