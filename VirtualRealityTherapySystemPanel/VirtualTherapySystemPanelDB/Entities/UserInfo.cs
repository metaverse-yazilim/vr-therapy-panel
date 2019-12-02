using System;

namespace VirtualTherapySystemPanelDB.Entities
{
    public class UserInfo
    {
        public int userId { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string description { get; set; }
        public int doctorid { get; set; }
        public DateTime birth { get; set; }
        public DateTime? next_session { get; set; }
        public string gender { get; set; }
        public bool available { get; set; } = false;
        public int sesid { get; set; }
    }
}