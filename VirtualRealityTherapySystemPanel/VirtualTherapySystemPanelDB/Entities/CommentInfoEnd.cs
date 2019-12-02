using System;
using System.Collections.Generic;
using VirtualTherapySystemPanelDB.Entities;

namespace VirtualTherapySystemPanelDB.Entities
{
    public class CommentInfoEnd
    {
        public List<CommentInfo> comments { get; set; } 
        public int nerv { get; set; }
        public int conf { get; set; }
        public string pat_com { get; set; }
        public string doc_com { get; set; }
        public List<BioData> GSR { get; set; }
        public List<BioData> HR { get; set; }
        public int ExpoId { get; set; }
    }
}
