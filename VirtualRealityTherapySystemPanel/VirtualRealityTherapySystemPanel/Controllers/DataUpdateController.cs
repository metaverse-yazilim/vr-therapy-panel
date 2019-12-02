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
    public class DataUpdateController : ApiController
    {
        // GET: Data
        public HttpResponseMessage Post(dynamic formData)
        {
            int exposureid = formData.exposure;
            List <string> datastring = UserManager.datareader(exposureid);
            List<double> data = new List<double>();
            if (datastring[1] == "")
            {
                data.Add(0);
                data.Add(0);
            }
            else
            {
                data.Add(Convert.ToDouble(datastring[0]));
                datastring[1]=datastring[1].Replace('.', ',');
                data.Add(Convert.ToDouble(datastring[1]));
            }
            //data.Add(new Double());
            //data[0] = ShimmerBluetooth.ppg;
            //data.Add(new Double());
            //if(ShimmerBluetooth.gsr != 0)
            //{
            //    //data[1] = ShimmerBluetooth.ppgraw;
            //    data[1] = Math.Round((1 / ShimmerBluetooth.gsr) * 1000, 2);
            //}
            //else
            //{
            //    data[1] = 0;
            //}

            //UserManager.dataadder(exposureid, data[1], data[0]);

            return JsonFunctions.JSONConvert(data);

        }
    }
}