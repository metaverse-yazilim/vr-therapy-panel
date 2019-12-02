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
    public class RandomPersonController : ApiController
    {
        // GET: RandomPerson
        public HttpResponseMessage Post(dynamic formData)
        {
            int person1 = formData.avatar1;
            int person2 = formData.avatar2;
            int person3 = formData.avatar3;
            int person4 = formData.avatar4;
            int person5 = formData.avatar5;

            List<int> data = new List<int>();

            for (int i=0; i<31; i++)
            {
                data.Add(1);
            }
            if (person1 == 99) {
                data[0] = 0;
                data[5] = 0;
                data[6] = 0;
                data[7] = 0;
                data[8] = 0;
                data[15] = 0;
                data[16] = 0;
                data[17] = 0;
                data[18] = 0;
                data[19] = 0;
                data[20] = 0;
                data[25] = 0;
                data[26] = 0;
                data[27] = 0;
                data[28] = 0;
                data[30] = 0;
            }
            if (person2 == 99) {
                data[1] = 0;
                data[5] = 0;
                data[9] = 0;
                data[10] = 0;
                data[11] = 0;
                data[15] = 0;
                data[16] = 0;
                data[17] = 0;
                data[21] = 0;
                data[22] = 0;
                data[23] = 0;
                data[25] = 0;
                data[26] = 0;
                data[27] = 0;
                data[29] = 0;
                data[30] = 0;
            }
            if (person3 == 99) {
                data[2] = 0;
                data[6] = 0;
                data[9] = 0;
                data[12] = 0;
                data[13] = 0;
                data[15] = 0;
                data[18] = 0;
                data[19] = 0;
                data[21] = 0;
                data[22] = 0;
                data[24] = 0;
                data[25] = 0;
                data[26] = 0;
                data[28] = 0;
                data[29] = 0;
                data[30] = 0;
            }
            if (person4 == 99) {
                data[3] = 0;
                data[7] = 0;
                data[10] = 0;
                data[12] = 0;
                data[14] = 0;
                data[16] = 0;
                data[18] = 0;
                data[20] = 0;
                data[21] = 0;
                data[23] = 0;
                data[24] = 0;
                data[25] = 0;
                data[27] = 0;
                data[28] = 0;
                data[29] = 0;
                data[30] = 0;
            }
            if (person5== 99) {
                data[4] = 0;
                data[8] = 0;
                data[11] = 0;
                data[13] = 0;
                data[14] = 0;
                data[17] = 0;
                data[19] = 0;
                data[20] = 0;
                data[22] = 0;
                data[23] = 0;
                data[24] = 0;
                data[26] = 0;
                data[27] = 0;
                data[28] = 0;
                data[29] = 0;
                data[30] = 0;
            }

            List<int> numbers = new List<int>();

            for (int k=0; k<31; k++)
            {
                if (data[k] == 1)
                {
                    numbers.Add(k);
                }
            }
            Random rnd = new Random();
            rnd.Next(0, numbers.Count);

            int answers = numbers[rnd.Next(0, numbers.Count)];

            return JsonFunctions.JSONConvert(answers);

        }
    }
}