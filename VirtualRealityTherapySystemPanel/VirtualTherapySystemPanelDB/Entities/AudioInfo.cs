using System;

namespace VirtualTherapySystemPanelDB.Entities
{
    public class AudioInfo
    {
        public int Id { get; set; }
        public int Index { get; set; }
        public int SessionId { get; set; }
        public byte[] MusicData { get; set; } = null;
        public int Standby { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }

    public class ResultAudioInfo
    {
        public bool Success { get; set; }
        public byte[] MusicData { get; set; } = null;
    }
}