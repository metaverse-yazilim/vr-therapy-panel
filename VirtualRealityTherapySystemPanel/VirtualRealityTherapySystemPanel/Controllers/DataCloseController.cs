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
using VirtualTherapySystemPanel.Controllers;

namespace VirtualRealityTherapySystemPanel.Controllers
{
    public class DataCloseController : ApiController
    {
        // GET: Data
        public void Post(dynamic formData)
        {
            //Thread threadB = new Thread(new ThreadStart(DataController.connector.Disconnect));
            //threadB.Start();
        }
    }
}