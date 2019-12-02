using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using VirtualTherapySystemPanelDB.Entities;

namespace VirtualTherapySystemPanel.Fucntions
{
    public class JsonFunctions
    {
        public static HttpResponseMessage JSONConvert(Object obje, bool DatabaseConvert = false)
        {
            string output = null;

            if (DatabaseConvert == true)
                output = JsonConvert.SerializeObject(obje, Formatting.None, new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            else
                output = JsonConvert.SerializeObject(obje);
            return new HttpResponseMessage { Content = new StringContent(output, System.Text.Encoding.UTF8, "application/json"), StatusCode = HttpStatusCode.OK };
        }

        public static HttpResponseMessage JSONlistConvert(List<UserInfo> obje, bool DatabaseConvert = false)
        {
            string output = null;

            if (DatabaseConvert == true)
                output = JsonConvert.SerializeObject(obje, Formatting.None, new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            else
                output = JsonConvert.SerializeObject(obje);
            return new HttpResponseMessage { Content = new StringContent(output, System.Text.Encoding.UTF8, "application/json"), StatusCode = HttpStatusCode.OK };
        }

        public static HttpResponseMessage JSONlistConvert(List<BioData> obje, bool DatabaseConvert = false)
        {
            string output = null;

            if (DatabaseConvert == true)
                output = JsonConvert.SerializeObject(obje, Formatting.None, new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            else
                output = JsonConvert.SerializeObject(obje);
            return new HttpResponseMessage { Content = new StringContent(output, System.Text.Encoding.UTF8, "application/json"), StatusCode = HttpStatusCode.OK };
        }

        public static HttpResponseMessage JSONlistConvert(List<AudioData> obje, bool DatabaseConvert = false)
        {
            string output = null;

            if (DatabaseConvert == true)
                output = JsonConvert.SerializeObject(obje, Formatting.None, new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            else
                output = JsonConvert.SerializeObject(obje);
            return new HttpResponseMessage { Content = new StringContent(output, System.Text.Encoding.UTF8, "application/json"), StatusCode = HttpStatusCode.OK };
        }
    }
}