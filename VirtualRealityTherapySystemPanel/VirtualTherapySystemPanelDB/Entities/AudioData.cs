using System;

namespace VirtualTherapySystemPanelDB.Entities
{
    public class AudioData
    {
        public int index { get; set; }
        public int exposureid { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public byte[] clip { get; set; }
    }
}