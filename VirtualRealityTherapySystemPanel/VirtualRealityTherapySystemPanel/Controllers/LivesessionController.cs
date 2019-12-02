using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class LivesessionController : ApiController
    {
        public HttpResponseMessage Post(dynamic formData)
        {
            try
            {
                int expoid = formData.exposure;
                int from = formData.from;
                int initial = formData.initial;
                int animation = 0;
                string question = "";
                string person1 = "99";
                string person2 = "99";
                string person3 = "99";
                string person4 = "99";
                string person5 = "99";
                string personperc = "120";
                string attitude = "";
                int time = formData.time;
                string last = "";
                string message = "";

                if (from == 9 || from == 6)
                {
                    person1 = formData.avatar1;
                }
                else if (from == 1 || from == 4 || from == 8)
                {
                    person1 = formData.avatar1;
                    person2 = formData.avatar2;
                    person3 = formData.avatar3;
                    person4 = formData.avatar4;
                    person5 = formData.avatar5;
                }
                else if (from == 3 || from == 7)
                {
                    person1 = formData.avatar1;
                    person2 = formData.avatar2;
                    person3 = formData.avatar3;
                }
                else if (from == 2 || from == 5)
                {
                    person1 = formData.avatar1;
                    person2 = formData.avatar2;
                    person3 = formData.avatar3;
                    person4 = formData.avatar4;
                    person5 = formData.avatar5;
                    personperc = formData.slider;
                }

                if (initial == 0)
                {
                    animation = formData.animation;
                    animation = animation - 1;
                    string animations = Convert.ToString(animation);
                    if (person1 != "99")
                    {
                        last = "0" + person1 + animations;
                    }

                    if (person2 != "99")
                    {
                        last = last + "0" + person2 + animations;
                    }

                    if (person3 != "99")
                    {
                        last = last + "0" + person3 + animations;
                    }

                    if (person4 != "99")
                    {
                        last = last + "0" + person4 + animations;
                    }

                    if (person5 != "99")
                    {
                        last = last + "0" + person5 + animations;
                    }

                    if (personperc != "120" && personperc != "0")
                    {
                        if(personperc == "100")
                        {
                            personperc = "00";
                        }
                        last = last + "1" + personperc + animations;
                    }

                    if (animation == 0)
                    {
                        message = "Avatar Davranışı: Alkış";
                    }
                    else if (animation == 1)
                    {
                        message = "Avatar Davranışı: Gülme";
                    }
                    else if (animation == 2)
                    {
                        message = "Avatar Davranışı: Sıkılma";
                    }
                    else if (animation == 3)
                    {
                        message = "Avatar Davranışı: Alaycı Gülme";
                    }
                    else if (animation == 4)
                    {
                        message = "Avatar Davranışı: Esneme";
                    }
                    else if (animation == 5)
                    {
                        message = "Avatar Davranışı: Uyuma";
                    }
                }

                else if (initial == 2)
                {
                    question = formData.question;
                    last = "2" + question;
                    message = UserManager.questionmessage(question);
                }
                else if (initial == 5)
                {
                    attitude = Convert.ToString(formData.conditions) + Convert.ToString(formData.conditionr) + Convert.ToString(formData.conditionu) + Convert.ToString(formData.conditionn);
                    string attitudelast = UserManager.attitudefinder(attitude);
                    last = "5" + attitudelast;
                    message = "Avatar tutumları değiştirildi";
                }

                return JsonFunctions.JSONConvert(UserManager.actionadder(last, message, time, expoid));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message.ToString());
            }
        }
    }
}