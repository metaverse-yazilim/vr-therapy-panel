using MySql.Data.MySqlClient;
using NAudio.Wave;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using VirtualTherapySystemPanelDB.Entities;

namespace VirtualTherapySystemPanelDB.Managers
{
    public class AudioManager : BaseManager
    {
        public static void SaveFile()
        {
            try
            {
                byte[] rawData = File.ReadAllBytes(@"c:\deneme.wav");
                //byte[] rawData = File.ReadAllBytes(@"c:\test.mp3");

                string conn_string = "server= vrsocial1.citxnibmvcmg.eu-central-1.rds.amazonaws.com; port=3306; database=vrsocial; username=metaverse;password=mtvrs18yzlm;charset=utf8; ";
                using (MySqlConnection connection = new MySqlConnection(conn_string))
                {
                    using (MySqlCommand command = new MySqlCommand())
                    {
                        command.Connection = connection;
                        command.CommandText = "INSERT INTO vrsocial.audio (audios) VALUES (?rawData);";

                        MySqlParameter fileContentParameter = new MySqlParameter("?rawData", MySqlDbType.Blob, rawData.Length);

                        fileContentParameter.Value = rawData;
                        command.Parameters.Add(fileContentParameter);

                        connection.Open();
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public static List<AudioInfo> GetWavFile(int sessionId)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            query.CommandText = "SELECT * FROM vrsocial.audio where sessionId = " + sessionId.ToString();
            MySqlDataReader myData;

            List<AudioInfo> list = new List<AudioInfo>();
            try
            {
                conn.Open();
                myData = query.ExecuteReader();
                while (myData.HasRows && myData.Read())
                {
                    AudioInfo data = new AudioInfo();
                    data.Id = (int)myData["id"];
                    data.Index = (int)myData["indexAudio"];
                    data.Standby = 0;
                    data.MusicData = Convert.FromBase64String(Encoding.ASCII.GetString((byte[])myData["audios"]));
                    data.StartTime = (DateTime)myData["startTime"];
                    data.EndTime = (DateTime)myData["EndTime"];
                    data.SessionId = sessionId;

                    list.Add(data);
                }

                if (list.Count > 1)
                {
                    list = list.OrderBy(q => q.Index).ToList();

                    for (int i = 1; i < list.Count; i++)
                    {
                        list[i].Standby = (int)(list[i].StartTime - list[i - 1].EndTime).TotalSeconds;
                    }
                }

                myData.Close();
                conn.Close();
            }
            catch (MySql.Data.MySqlClient.MySqlException ex)
            {
                conn.Close();
            }
            return list;
        }

        private byte[] Combine(params byte[][] arrays)
        {
            byte[] rv = new byte[arrays.Sum(a => a.Length)];
            int offset = 0;
            foreach (byte[] array in arrays)
            {
                System.Buffer.BlockCopy(array, 0, rv, offset, array.Length);
                offset += array.Length;
            }
            return rv;
        }

        public static ResultAudioInfo GetSoundFile(int id)
        {
            ResultAudioInfo result = new ResultAudioInfo() { Success = false };

            if (id < 1)
                return result;

            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            query.CommandText = "SELECT * FROM vrsocial.audio where sessionId = " + id.ToString() + " order by indexAudio";
            MySqlDataReader myData;

            List<AudioInfo> allData = new List<AudioInfo>();
            try
            {
                conn.Open();
                myData = query.ExecuteReader();

                if (!myData.HasRows)
                {
                    return null;
                }

                while (myData.HasRows && myData.Read())
                {
                    AudioInfo data = new AudioInfo();
                    data.Id = (int)myData["id"];
                    data.Index = (int)myData["indexAudio"];
                    data.Standby = 0;
                    //data.MusicData = ((byte[])myData["audios"]);
                    data.MusicData = Convert.FromBase64String(Encoding.ASCII.GetString((byte[])myData["audios"]));
                    data.StartTime = (DateTime)myData["startTime"];
                    data.EndTime = (DateTime)myData["EndTime"];

                    allData.Add(data);
                }

                for (int i = 0; i < allData.Count - 1; i++)
                {
                    allData[i].Standby = (int)(allData[i + 1].StartTime - allData[i].EndTime).TotalMilliseconds;
                }

                WaveFileWriter waveFileWriter = null;

                int silentBytes = (97 * allData.Sum(q => q.Standby));

                if (allData.Count > 0)
                {
                    byte[] buffer = new byte[1024];

                    try
                    {
                        byte[] rv = new byte[allData.Sum(a => a.MusicData.Length) + silentBytes];

                        MemoryStream streamFileGibi = new MemoryStream(rv);

                        for (int i = 0; i < allData.Count; i++)
                        {
                            Stream stream = new MemoryStream(allData[i].MusicData);

                            using (WaveFileReader reader = new WaveFileReader(stream))
                            {
                                if (waveFileWriter == null)
                                {
                                    // first time in create new Writer
                                    waveFileWriter = new WaveFileWriter(streamFileGibi, reader.WaveFormat);
                                }
                                else
                                {
                                    if (!reader.WaveFormat.Equals(waveFileWriter.WaveFormat))
                                    {
                                        throw new InvalidOperationException("Can't concatenate WAV Files that don't share the same format");
                                    }
                                }

                                int read;
                                while ((read = reader.Read(buffer, 0, buffer.Length)) > 0)
                                {
                                    try
                                    {
                                        waveFileWriter.WriteData(buffer, 0, read);
                                    }
                                    catch (Exception err)
                                    {
                                        ;
                                    }
                                }

                                int milsecond = allData[i].Standby;
                                if (milsecond > 0)
                                {
                                    int bytesPerMillisecond = waveFileWriter.WaveFormat.AverageBytesPerSecond / 1000;
                                    //an new all zero byte array will play silence
                                    var addedSilentBytes = new byte[milsecond * bytesPerMillisecond];
                                    waveFileWriter.Write(addedSilentBytes, 0, addedSilentBytes.Length);
                                }
                            }
                        }
                        result.Success = true;
                        result.MusicData = streamFileGibi.ToArray();
                    }
                    catch (Exception er)
                    {
                        ;
                    }
                }

                myData.Close();
                conn.Close();
            }
            catch (MySql.Data.MySqlClient.MySqlException ex)
            {
                conn.Close();
            }
            return result;
        }
    }
}