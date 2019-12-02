using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VirtualTherapySystemPanel.Fucntions;
using VirtualTherapySystemPanelDB.Managers;
using VirtualTherapySystemPanelDB.Entities;
using System.Collections.Generic;

using System.Windows.Forms;
using System.Threading;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class DataController : ApiController
    {
        // GET: Data
        public void Post(dynamic formData)
        {
            //string j = Convert.ToString(formData.finishit);
            //ShimmerAPI.Control connector = new ShimmerAPI.Control();
            ////if (j =="0")
            ////{
            //    Thread threadA = new Thread(new ThreadStart(connector.AutoConnect));
            //    threadA.Start();
            //}
            //else
            //{
            //    Thread threadb = new Thread(new ThreadStart(connector.Disconnect));
            //    threadb.Start();
            //}
            
        }
    }
}