using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using VirtualTherapySystemPanel;
using VirtualTherapySystemPanelDB.Entities;

namespace VirtualTherapySystemPanelDB.Managers
{
    public class UserManager
    {
        private static DateTime NowGiver(int gmt)
        {
            DateTime moment = DateTime.Now;
            moment = moment.AddHours(gmt);
            return moment;
        }

        //Saniye ve dakikaya 0 ekleyen fonksiyon başlangıç
        private static string checkTime(int i)
        {
            string a = "" + i;
            if (i < 10)
            {
                a = "0" + i;
            };  // add zero in front of numbers < 10
            return a;
        }

        //Saniye ve dakikaya 0 ekleyen fonksiyon son

        public static MySqlConnection Conn()
        {
            string conn_string = "server= vrsocial1.citxnibmvcmg.eu-central-1.rds.amazonaws.com; port=3306; database=vrsocial; username=metaverse;password=mtvrs18yzlm;charset=utf8; ";
            MySqlConnection conn = new MySqlConnection(conn_string);

            return conn;
        }

        //Terapist girişinin kontrolünü yapan fonksiyon başlangıç
        public static UserInfo userControl(string username, string password)
        {
            List<String> salthashList = null;
            List<String> namesList = null;

            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            query.CommandText = "SELECT passwithhash, firstname, lastname, username, subscription_type, remaining_session, subscription_lastday, id FROM doctortable WHERE username=@username";
            //query.Parameters.AddWithValue("@password", password);
            query.Parameters.AddWithValue("@username", username);
            UserInfo result = new UserInfo();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            MySqlDataReader fetch_query = query.ExecuteReader();
            Debug.WriteLine("ATTENTION!");
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (salthashList == null)
                {
                    salthashList = new List<String>();
                    namesList = new List<String>();
                }

                String saltHashes = fetch_query.GetString(fetch_query.GetOrdinal("passwithhash"));
                salthashList.Add(saltHashes);

                String fullname = fetch_query.GetString(fetch_query.GetOrdinal("firstname")) + "  " +
                    fetch_query.GetString(fetch_query.GetOrdinal("lastname"));
                namesList.Add(fullname);
                //result.name = fetch_query["firstname"].ToString();
                //result.surname = fetch_query["lastname"].ToString();
                //result.username = fetch_query["username"].ToString();
                //result.userId = fetch_query["id"].GetHashCode();
            }

            if (salthashList != null)
            {
                for (int i = 0; i < salthashList.Count; i++)
                {
                    //queryStr = "";
                    bool validUser = PasswordStorage.VerifyPassword(password, salthashList[i]);
                    if (validUser == true)
                    {
                        result.name = fetch_query["firstname"].ToString();
                        result.surname = fetch_query["lastname"].ToString();
                        result.username = fetch_query["username"].ToString();
                        result.userId = fetch_query["id"].GetHashCode();
                        result.birth = Convert.ToDateTime(fetch_query["subscription_lastday"].ToString());
                        result.doctorid = fetch_query["subscription_type"].GetHashCode();
                        result.sesid = fetch_query["remaining_session"].GetHashCode();
                        //Session["username"] = namesList[i];
                        //Response.BufferOutput = true;
                        //Response.Redirect("LoggedIn.aspx", false);
                    }
                    else
                    {
                        password = "User not authenticated";
                    }
                }
            }

            //Debug.Write(result.name);
            //Debug.Write(result.surname);
            //Debug.Write(result.username);

            return result;
        }

        //Terapist girişinin kontrolünü yapan fonksiyon son

        //Terapist şifre yenileme için email kontrolü yapan fonksiyon başlangıç
        public static bool EmailControl(string email)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            query.CommandText = "SELECT id FROM doctortable WHERE mailadress=@email";
            //query.Parameters.AddWithValue("@password", password);
            query.Parameters.AddWithValue("@email", email);
            bool result = false;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            MySqlDataReader fetch_query = query.ExecuteReader();
            Debug.WriteLine("PATIENTION!");
            while (fetch_query.HasRows && fetch_query.Read())
            {
                result = true;
            }
            return result;
        }

        //Terapist şifre yenileme için email kontrolü yapan fonksiyon son

        //Terapist tokenini veritabanına yazan fonksiyon başlangıç
        public static void TokenInsert(string token, string email, int gmt)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            DateTime now = NowGiver(gmt);

            query.CommandText = "UPDATE vrsocial.doctortable SET tokenwithhash='" + token + "' WHERE mailadress='" + email + "';" +
                "UPDATE vrsocial.doctortable SET tokentime= '" + now.Year + "-" + now.Month + "-" + now.Day + "-" + now.Hour + "-" + now.Minute + "-" + now.Second + "' WHERE mailadress='" + email + "';";
            //query.Parameters.AddWithValue("@twh", token);
            query.ExecuteReader();

            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }

        //Terapist tokenini veritabanına yazan fonksiyon son

        //Danışan şifre yenileme için email kontrolü yapan fonksiyon başlangıç
        public static bool EmailControlP(string email)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            query.CommandText = "SELECT id FROM patient WHERE mailadress=@email";
            //query.Parameters.AddWithValue("@password", password);
            query.Parameters.AddWithValue("@email", email);
            bool result = false;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            MySqlDataReader fetch_query = query.ExecuteReader();
            Debug.WriteLine("PATIENTION!");
            while (fetch_query.HasRows && fetch_query.Read())
            {
                result = true;
            }
            return result;
        }

        //Danışan şifre yenileme için email kontrolü yapan fonksiyon son

        //Danışan tokenini veritabanına yazan fonksiyon başlangıç
        public static void TokenInsertP(string token, string email, int gmt)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            DateTime now = NowGiver(gmt);
            query.CommandText = "UPDATE vrsocial.patient SET tokenwithhash='" + token + "' WHERE mailadress='" + email + "';" +
                "UPDATE vrsocial.patient SET tokentime= '" + now.Year + "-" + now.Month + "-" + now.Day + "-" + now.Hour + "-" + now.Minute + "-" + now.Second + "' WHERE mailadress='" + email + "';";
            //query.Parameters.AddWithValue("@twh", token);
            query.ExecuteReader();

            conn.Close();
        }

        //Danışan tokenini veritabanına yazan fonksiyon son

        //Token kontrolü yapan fonksiyon başlangıç
        public static bool PassCheck(string hash, int gmt)
        {
            bool isHashCorrect = false;
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            DateTime now = NowGiver(gmt);
            now = now - new TimeSpan(1, 0, 0, 0);
            query.CommandText = "SELECT tokentime FROM doctortable WHERE tokenwithhash='" + hash + "';";
            //query.Parameters.AddWithValue("@twh", token);
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (DateTime.Compare(now, Convert.ToDateTime(fetch_query["tokentime"].ToString())) < 0)
                {
                    isHashCorrect = true;
                }
            }
            conn.Close();

            if (isHashCorrect)
            {
                return isHashCorrect;
            }
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT tokentime FROM patient WHERE tokenwithhash='" + hash + "';";
            //query.Parameters.AddWithValue("@twh", token);
            fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (DateTime.Compare(now, Convert.ToDateTime(fetch_query["tokentime"].ToString())) < 0)
                {
                    isHashCorrect = true;
                }
            }
            conn.Close();

            return isHashCorrect;
        }

        //Token kontrolü yapan fonksiyon son

        //Token zaman kontrolü yapan fonksiyon başlangıç
        public static void HashTimeController(int docid, int gmt)
        {
            string dull = "This is not a token!";
            bool isHashOld = false;
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            DateTime now = NowGiver(gmt);
            now = now - new TimeSpan(1, 0, 0, 0);
            query.CommandText = "SELECT tokentime, tokenwithhash FROM doctortable WHERE id='" + docid + "';";
            //query.Parameters.AddWithValue("@twh", token);
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (DateTime.Compare(now, Convert.ToDateTime(fetch_query["tokentime"].ToString())) > 0)
                {
                    isHashOld = true;
                }
            }
            conn.Close();
            if (isHashOld)
            {
                try
                {
                    conn.Open();
                }
                catch (MySqlException ex)
                {
                    Debug.WriteLine(ex.Message);
                }
                query.CommandText = "UPDATE vrsocial.doctortable SET tokenwithhash = '" + dull + "' where id='" + docid + "';";
                query.ExecuteReader();

                conn.Close();
            }
        }

        //Token zaman kontrolü yapan fonksiyon son

        //Token zaman kontrolü yapan fonksiyon başlangıç
        public static void HashErase(string token)
        {
            string dull = "This is not a token!";

            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "UPDATE vrsocial.doctortable SET tokenwithhash = '" + dull + "' where tokenwithhash='" + token + "';";
            query.ExecuteReader();

            conn.Close();
        }

        //Token zaman kontrolü yapan fonksiyon son

        //Şifre değiştirme fonksiyon başlangıç
        public static void PassChange(string token, string password)
        {
            String saltHashReturned = PasswordStorage.CreateHash(password);
            int commaIndex = saltHashReturned.IndexOf(":");
            String extractedString = saltHashReturned.Substring(0, commaIndex);
            commaIndex = saltHashReturned.IndexOf(":");
            extractedString = saltHashReturned.Substring(commaIndex + 1);
            commaIndex = extractedString.IndexOf(":");
            String salt = extractedString.Substring(0, commaIndex);
            commaIndex = extractedString.IndexOf(":");
            extractedString = extractedString.Substring(commaIndex + 1);
            String hash = extractedString;

            bool isDoctor = false;
            bool isPatient = false;
            int id_change = 0;
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            UserInfo result = new UserInfo();

            query.CommandText = "SELECT id FROM vrsocial.doctortable WHERE tokenwithhash=@token";
            query.Parameters.AddWithValue("@token", token);

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                id_change = fetch_query["id"].GetHashCode();
                isDoctor = true;
            }
            conn.Close();

            if (isDoctor)
            {
                try
                {
                    conn.Open();
                }
                catch (MySqlException ex)
                {
                    Debug.WriteLine(ex.Message);
                }

                query.CommandText = "UPDATE vrsocial.doctortable SET password='" + password + "' WHERE id=" + id_change + ";" +
                    "UPDATE vrsocial.doctortable SET passwithhash='" + saltHashReturned + "' WHERE id=" + id_change + ";";
                query.ExecuteReader();
                conn.Close();
                return;
            }

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            query.CommandText = "SELECT id FROM vrsocial.patient WHERE tokenwithhash=@token";

            fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                id_change = fetch_query["id"].GetHashCode();
                isPatient = true;
            }
            conn.Close();
            if (isPatient)
            {
                try
                {
                    conn.Open();
                }
                catch (MySqlException ex)
                {
                    Debug.WriteLine(ex.Message);
                }

                query.CommandText = "UPDATE vrsocial.patient SET password='" + password + "' WHERE id=" + id_change + ";" +
                    "UPDATE vrsocial.patient SET passwithhash='" + saltHashReturned + "' WHERE id=" + id_change + ";";
                query.ExecuteReader();
                conn.Close();
                return;
            }
        }

        //Şifre değiştirme yapan fonksiyon son

        //Terapist kaydını yapan fonksiyon başlangıç
        public static UserInfo UserRegister(string firstname, string lastname, string username, string password, string email, string key)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            UserInfo result = new UserInfo();
            int keyid = 10000;

            query.CommandText = "SELECT id, username, mailadress FROM vrsocial.doctortable WHERE username=@username OR mailadress=@mail";
            query.Parameters.AddWithValue("@mail", email);
            query.Parameters.AddWithValue("@username", username);

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (fetch_query["username"].ToString() == username)
                {
                    //Kullanıcı adı alınmış hatası
                    result.name = "Hata1";
                    return result;
                }
                else if (fetch_query["mailadress"].ToString() == email)
                {
                    //E-mail daha önce alınmış hatası
                    result.name = "Hata2";
                    return result;
                }
            }

            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            query.CommandText = "SELECT id FROM vrsocial.keytable WHERE keycol='" + key + "'";
            fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (fetch_query["id"].ToString() == null)
                {
                    //Hatalı Key
                    result.name = "Hata3";
                    return result;
                }
                else
                {
                    keyid = fetch_query["id"].GetHashCode();
                }
            }
            conn.Close();

            if (keyid == 10000)
            {
                //Hatalı Key
                result.name = "Hata3";
                return result;
            }

            Random rnd = new Random();
            string coupon = GenerateCoupon(10, rnd);

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            query.CommandText = "UPDATE vrsocial.keytable SET keycol='" + coupon + "' WHERE id=" + keyid + ";";
            query.ExecuteReader();

            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            query.CommandText = "INSERT INTO vrsocial.doctortable (firstname, lastname, mailadress, username, password, passwithhash)" +
                "VALUES(@fname,@lname,@mail,@username,@psw,@pwh)";

            query.Parameters.AddWithValue("@psw", password);
            query.Parameters.AddWithValue("@fname", firstname);
            query.Parameters.AddWithValue("@lname", lastname);

            String saltHashReturned = PasswordStorage.CreateHash(password);
            int commaIndex = saltHashReturned.IndexOf(":");
            String extractedString = saltHashReturned.Substring(0, commaIndex);
            commaIndex = saltHashReturned.IndexOf(":");
            extractedString = saltHashReturned.Substring(commaIndex + 1);
            commaIndex = extractedString.IndexOf(":");
            String salt = extractedString.Substring(0, commaIndex);
            commaIndex = extractedString.IndexOf(":");
            extractedString = extractedString.Substring(commaIndex + 1);
            String hash = extractedString;

            query.Parameters.AddWithValue("?pwh", saltHashReturned);
            query.ExecuteReader();
            conn.Close();

            query.CommandText = "SELECT firstname, lastname, username, id FROM vrsocial.doctortable WHERE username=@username AND password=@password";
            query.Parameters.AddWithValue("@password", password);

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                result.name = fetch_query["firstname"].ToString();
                result.surname = fetch_query["lastname"].ToString();
                result.username = fetch_query["username"].ToString();
                result.userId = fetch_query["id"].GetHashCode();
            }
            conn.Close();
            return result;
        }

        //Terapist kaydını yapan fonksiyon son

        //Danışan girişinin kontrolünü yapan fonksiyon başlangıç
        public static UserInfo PatientControl(string username, string password)
        {
            List<String> salthashList = null;
            List<String> namesList = null;

            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            query.CommandText = "SELECT username, id, gender, doctorid, passwithhash FROM patient WHERE username=@username";
            //query.Parameters.AddWithValue("@password", password);
            query.Parameters.AddWithValue("@username", username);
            UserInfo result = new UserInfo();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            MySqlDataReader fetch_query = query.ExecuteReader();
            Debug.WriteLine("PATIENTION!");
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (salthashList == null)
                {
                    salthashList = new List<String>();
                    namesList = new List<String>();
                }

                String saltHashes = fetch_query.GetString(fetch_query.GetOrdinal("passwithhash"));
                salthashList.Add(saltHashes);

                String fullname = fetch_query.GetString(fetch_query.GetOrdinal("username"));
                namesList.Add(fullname);
                //result.name = fetch_query["firstname"].ToString();
                //result.surname = fetch_query["lastname"].ToString();
                //result.username = fetch_query["username"].ToString();
                //result.userId = fetch_query["id"].GetHashCode();
            }

            if (salthashList != null)
            {
                for (int i = 0; i < salthashList.Count; i++)
                {
                    //queryStr = "";
                    bool validUser = PasswordStorage.VerifyPassword(password, salthashList[i]);
                    if (validUser == true)
                    {
                        result.username = fetch_query["username"].ToString();
                        result.userId = fetch_query["id"].GetHashCode();
                        result.gender = fetch_query["gender"].ToString();
                        result.doctorid = fetch_query["doctorid"].GetHashCode();
                        //            //Session["username"] = namesList[i];
                        //            //Response.BufferOutput = true;
                        //            //Response.Redirect("LoggedIn.aspx", false);
                    }
                    else
                    {
                        password = "User not authenticated";
                    }
                }
            }

            Debug.Write(result.username);
            return result;
        }

        //Danışan girişinin kontrolünü yapan fonksiyon son

        //Danışan kaydını yapan fonksiyon başlangıç
        public static UserInfo PatientRegister(string username, string password, string description, int docid, DateTime birth, string gender, string email)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            DateTime defns = new DateTime(3000, 1, 1, 0, 0, 0);
            UserInfo result = new UserInfo();

            query.CommandText = "SELECT id, username, mailadress FROM vrsocial.patient WHERE username=@uname OR mailadress=@mail";
            query.Parameters.AddWithValue("@mail", email);
            query.Parameters.AddWithValue("@uname", username);

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (fetch_query["username"].ToString() == username)
                {
                    //Kullanıcı adı alınmış hatası
                    result.name = "Hata1";
                    return result;
                }
                else if (fetch_query["mailadress"].ToString() == email)
                {
                    //E-mail daha önce alınmış hatası
                    result.name = "Hata2";
                    return result;
                }
            }

            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            int ns_id = 0;
            query.CommandText = "INSERT INTO vrsocial.patient (birth, gender, username, password, passwithhash, doctorid, Next_Session, mailadress,next_session_id,description)" +
                "VALUES(@birth,@gnd,@uname,@psw,@pwh,@did,@ns,@mail,@nsid,@desc)";
            query.Parameters.AddWithValue("@birth", birth);
            query.Parameters.AddWithValue("@gnd", gender);
            query.Parameters.AddWithValue("@psw", password);
            query.Parameters.AddWithValue("@did", docid);
            query.Parameters.AddWithValue("@ns", defns);
            query.Parameters.AddWithValue("@nsid", ns_id);
            query.Parameters.AddWithValue("@desc", description);

            String saltHashReturned = PasswordStorage.CreateHash(password);
            int commaIndex = saltHashReturned.IndexOf(":");
            String extractedString = saltHashReturned.Substring(0, commaIndex);
            commaIndex = saltHashReturned.IndexOf(":");
            extractedString = saltHashReturned.Substring(commaIndex + 1);
            commaIndex = extractedString.IndexOf(":");
            String salt = extractedString.Substring(0, commaIndex);
            commaIndex = extractedString.IndexOf(":");
            extractedString = extractedString.Substring(commaIndex + 1);
            String hash = extractedString;

            query.Parameters.AddWithValue("?pwh", saltHashReturned);

            query.ExecuteReader();

            conn.Close();

            return result;
        }

        //Danışan kaydını yapan fonksiyon son

        //Danışan açık seans kontrolü başlangıç
        public static int OpenSesCont(int docid, int GMT)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            DateTime next = new DateTime(3000, 01, 01, 00, 00, 00);
            DateTime moment = new DateTime(3000, 01, 01, 00, 00, 00);
            moment = NowGiver(GMT);
            moment = moment.AddHours(-1);
            int j = 0;
            int a = 0;
            int b = 0;
            int patid = 0;
            string check = "Yapıldı";
            string str = "";
            int remaining_session = 999;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT openSession FROM vrsocial.doctortable WHERE id=" + docid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (fetch_query["openSession"].ToString() != "0")
                {
                    str = fetch_query["openSession"].ToString();
                    j = Convert.ToInt32(str.Substring(0, 1));
                    if (j == 0)
                    {
                        j = 5;
                    }
                }
                else
                {
                    j = Convert.ToInt32(fetch_query["openSession"].ToString());
                }
            }
            conn.Close();

            if (j != 0)
            {
                try
                {
                    conn.Open();
                }
                catch (MySqlException ex)
                {
                    Debug.WriteLine(ex.Message);
                }
                query.CommandText = "SELECT expo_id, Next_Session, id FROM vrsocial.patient WHERE doctorid=" + docid + " AND openSession=" + str + "";
                fetch_query = query.ExecuteReader();
                while (fetch_query.HasRows && fetch_query.Read())
                {
                    a = Convert.ToInt32(fetch_query["expo_id"].ToString());
                    patid = Convert.ToInt32(fetch_query["id"].ToString());
                    next = Convert.ToDateTime(fetch_query["Next_Session"].ToString());
                }
                conn.Close();
                string doc_pat_com = "Seans sonlandırılmamış veya veriler kaydedilmeden kapatılmış.";
                int nerv_conf = 0;

                if (DateTime.Compare(moment, next) < 0)
                {
                    try
                    {
                        conn.Open();
                    }
                    catch (MySqlException ex)
                    {
                        Debug.WriteLine(ex.Message);
                    }
                    query.CommandText = "UPDATE vrsocial.exposure SET doc_comment='" + doc_pat_com + "' WHERE id=" + a + ";" +
                        "UPDATE vrsocial.exposure SET pat_comment='" + doc_pat_com + "' WHERE id=" + a + ";" +
                        "UPDATE vrsocial.exposure SET nervousness=" + nerv_conf + " WHERE id=" + a + ";" +
                        "UPDATE vrsocial.exposure SET confidence=" + nerv_conf + " WHERE id=" + a + ";";
                    query.ExecuteReader();
                    conn.Close();

                    expo_closer(patid, docid);
                }
                else
                {
                    try
                    {
                        conn.Open();
                    }
                    catch (MySqlException ex)
                    {
                        Debug.WriteLine(ex.Message);
                    }
                    query.CommandText = "SELECT max(session_number), id FROM vrsocial.session WHERE patid=" + patid + "";
                    fetch_query = query.ExecuteReader();
                    while (fetch_query.HasRows && fetch_query.Read())
                    {
                        b = Convert.ToInt32(fetch_query["id"].ToString());
                    }
                    conn.Close();

                    try
                    {
                        conn.Open();
                    }
                    catch (MySqlException ex)
                    {
                        Debug.WriteLine(ex.Message);
                    }
                    query.CommandText = "UPDATE vrsocial.exposure SET doc_comment='" + doc_pat_com + "' WHERE id=" + a + ";" +
                        "UPDATE vrsocial.exposure SET pat_comment='" + doc_pat_com + "' WHERE id=" + a + ";" +
                        "UPDATE vrsocial.exposure SET nervousness=" + nerv_conf + " WHERE id=" + a + ";" +
                        "UPDATE vrsocial.exposure SET confidence=" + nerv_conf + " WHERE id=" + a + ";" +
                        "UPDATE vrsocial.session SET session_place = '" + check + "' WHERE id = " + b + " ; ";
                    query.ExecuteReader();

                    conn.Close();

                    AdjustNextSession(patid, GMT);
                    expo_closer(patid, docid);
                }
            }
            int bir = 1;
            string not = "-";
            List<int> blist = new List<int>();
            List<int> jlist = new List<int>();
            List<DateTime> nextlist = new List<DateTime>();
            nextlist.Add(new DateTime(3000, 01, 01, 00, 00, 00));
            int counter_ = 0;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT id,session_date,patid FROM vrsocial.session WHERE docid=" + docid + " AND session_place='" + not + "' AND session_started=" + bir + "";
            fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                blist.Add(Convert.ToInt32(fetch_query["id"].ToString()));
                jlist.Add(Convert.ToInt32(fetch_query["patid"].ToString()));
                if (counter_ == 0)
                {
                    nextlist[0] = Convert.ToDateTime(fetch_query["session_date"].ToString());
                    counter_ = counter_ + 1;
                }
                else
                {
                    nextlist.Add(Convert.ToDateTime(fetch_query["session_date"].ToString()));
                    counter_ = counter_ + 1;
                }
            }

            conn.Close();
            if (DateTime.Compare(moment, nextlist[0]) > 0)
            {
                for (int i = 0; i < counter_; i++)
                {
                    if (DateTime.Compare(moment, nextlist[i]) > 0)
                    {
                        try
                        {
                            conn.Open();
                        }
                        catch (MySqlException ex)
                        {
                            Debug.WriteLine(ex.Message);
                        }

                        query.CommandText = "UPDATE vrsocial.session SET session_place ='" + check + "' WHERE id =" + blist[i] + " ; ";
                        query.ExecuteReader();
                        conn.Close();
                        remaining_session = session_counter_decrease(docid);
                        AdjustNextSession(jlist[i], GMT);
                    }
                }
            }

            return remaining_session;
        }

        //Danışan açık seans kontrolü son

        //Danışan listesini veritabanından alan fonksiyon başlangıç
        public static List<UserInfo> GetList(int docid, int GMT)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            List<UserInfo> result = new List<UserInfo>();
            List<UserInfo> results = new List<UserInfo>();
            List<Int32> adjustice = new List<Int32>(); // adjustNextSession a girecekler
            int j = 0;
            int a = 0;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT username, birth, gender, description, date_format(Next_Session, \"%e %c %Y %T\"), id FROM vrsocial.patient WHERE doctorid=" + docid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                result.Add(new UserInfo());
                result[j].username = fetch_query["username"].ToString();
                result[j].gender = fetch_query["gender"].ToString();
                result[j].birth = Convert.ToDateTime(fetch_query["birth"].ToString());
                result[j].userId = Convert.ToInt16(fetch_query["id"].ToString());
                if (fetch_query["description"].ToString() != "")
                {
                    result[j].description = fetch_query["description"].ToString();
                }
                else
                {
                    result[j].description = "-";
                }
                if (fetch_query["date_format(Next_Session, \"%e %c %Y %T\")"].ToString() != "1 1 3000 00:00:00")
                {
                    result[j].next_session = Convert.ToDateTime(fetch_query["date_format(Next_Session, \"%e %c %Y %T\")"].ToString());
                    DateTime moment = new DateTime(3000, 01, 01, 00, 00, 00);
                    moment = NowGiver(GMT);
                    moment = moment.AddHours(-1);
                    DateTime ns = Convert.ToDateTime(result[j].next_session);
                    if (DateTime.Compare(ns, moment) < 0)
                    {
                        adjustice.Add(result[j].userId);
                        results.Add(result[j]);
                        j = j + 1;
                    }
                    else
                    {
                        results.Add(result[j]);
                        j = j + 1;
                    }
                }
                else
                {
                    results.Add(result[j]);
                    j = j + 1;
                }
            }
            conn.Close();
            a = adjustice.Count;
            if (a != 0)
            {
                for (int k = 0; k < a; k++)
                {
                    AdjustNextSession(adjustice[k], GMT);
                }
                List<UserInfo> results2 = new List<UserInfo>();
                j = 0;
                try
                {
                    conn.Open();
                }
                catch (MySqlException ex)
                {
                    Debug.WriteLine(ex.Message);
                }
                query.CommandText = "SELECT username, description, birth, gender, date_format(Next_Session, \"%e %c %Y %T\"), id FROM vrsocial.patient WHERE doctorid=" + docid + "";
                fetch_query = query.ExecuteReader();
                while (fetch_query.HasRows && fetch_query.Read())
                {
                    result[j].username = fetch_query["username"].ToString();
                    result[j].gender = fetch_query["gender"].ToString();
                    result[j].birth = Convert.ToDateTime(fetch_query["birth"].ToString());
                    result[j].userId = Convert.ToInt16(fetch_query["id"].ToString());
                    if (fetch_query["description"].ToString() != "")
                    {
                        result[j].description = fetch_query["description"].ToString();
                    }
                    else
                    {
                        result[j].description = "-";
                    }
                    if (fetch_query["date_format(Next_Session, \"%e %c %Y %T\")"].ToString() != "1 1 3000 00:00:00")
                    {
                        result[j].next_session = Convert.ToDateTime(fetch_query["date_format(Next_Session, \"%e %c %Y %T\")"].ToString());
                        results2.Add(result[j]);
                        j = j + 1;
                    }
                    else
                    {
                        result[j].next_session = null;
                        results2.Add(result[j]);
                        j = j + 1;
                    }
                }
                conn.Close();
                return results2;
            }

            return results;
        }

        //Danışan listesini veritabanından alan fonksiyon son

        //Danışanın tüm bilgilerini ve seans bilgilerini veritabanından alan fonksiyon başlangıç
        public static UserInfo GetPat(int patid, int docid, int GMT)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            UserInfo result = new UserInfo();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT username, birth, gender, Next_Session, next_session_id, description FROM vrsocial.patient WHERE id=" + patid + " AND doctorid=" + docid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                result.username = fetch_query["username"].ToString();
                result.gender = fetch_query["gender"].ToString();
                result.birth = Convert.ToDateTime(fetch_query["birth"].ToString());
                result.userId = patid;
                result.sesid = Convert.ToInt16(fetch_query["next_session_id"].ToString());
                if (fetch_query["Next_Session"].ToString() != "1 Oca 3000 00:00:00")
                {
                    result.next_session = Convert.ToDateTime(fetch_query["Next_Session"].ToString());
                }
                if (fetch_query["description"].ToString() != "")
                {
                    result.description = fetch_query["description"].ToString();
                }
                else
                {
                    result.description = "-";
                }
            }
            conn.Close();

            //DateTime thisday = NowGiver(GMT);
            DateTime nxt = Convert.ToDateTime(result.next_session);
            //if (nxt.Year == thisday.Year)
            //{
            //    if (nxt.DayOfYear == thisday.DayOfYear)
            //    {
            //        if ((nxt.TimeOfDay.TotalSeconds - 3600) <= thisday.TimeOfDay.TotalSeconds && thisday.TimeOfDay.TotalSeconds <= (nxt.TimeOfDay.TotalSeconds + 3600))
            //        {
            //            result.available = true;
            //        }
            //    }
            //}


            int tolerance = 66;

            if (DateTime.UtcNow.AddHours(GMT).AddMinutes(-1 * tolerance) < nxt && nxt < DateTime.UtcNow.AddHours(GMT).AddMinutes(tolerance))
            {
                result.available = true;
            }



                return result;
        }

        //Danışanın tüm bilgilerini ve seans bilgilerini veritabanından alan fonksiyon son

        //Danışan seans listesi bulma fonksiyonu başlangıç
        public static List<UserInfo> GetSesList(int patid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            List<UserInfo> result = new List<UserInfo>();
            int j = 0;
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT session_date,session_place, id FROM vrsocial.session WHERE patid=" + patid + " order by session_date";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                result.Add(new UserInfo());
                result[j].next_session = Convert.ToDateTime(fetch_query["session_date"].ToString());
                result[j].password = fetch_query["session_place"].ToString();
                result[j].userId = Convert.ToInt16(fetch_query["id"].ToString());
                j = j + 1;
            }
            conn.Close();
            return result;
        }

        //Danışan seans listesi bulma fonksiyonu son

        //Seans silme fonksiyonu başlangıç
        public static void SesDel(int sesid, int patid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            int session = 0;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            query.CommandText = "SELECT session_number FROM vrsocial.session WHERE id =" + sesid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (fetch_query["session_number"].ToString() != "")
                {
                    session = Convert.ToInt16(fetch_query["session_number"].ToString());
                }
            }

            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            query.CommandText = "DELETE FROM vrsocial.session WHERE id =" + sesid + "";
            query.ExecuteReader();
            conn.Close();
            if (session != 0)
            {
                try
                {
                    conn.Open();
                }
                catch (MySqlException ex)
                {
                    Debug.WriteLine(ex.Message);
                }

                query.CommandText = "DELETE FROM vrsocial.exposure WHERE patid =" + patid + " AND session_number =" + session + "";
                query.ExecuteReader();
                conn.Close();
            }
        }

        //Seans silme fonksiyonu son

        //Seans editleme fonksiyonu başlangıç
        public static void SesEdit(DateTime newsesdate, int sesid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            query.CommandText = "UPDATE vrsocial.session SET session_date = '" + newsesdate.Year + "-" + newsesdate.Month + "-" + newsesdate.Day + "-" + newsesdate.Hour + "-" + newsesdate.Minute + "-" + newsesdate.Second + "' WHERE id = " + sesid + "";
            query.ExecuteReader();
            conn.Close();
        }

        //Seans editleme fonksiyonu son

        //Sıradaki Seansı güncelleme fonksiyonu başlangıç
        public static void AdjustNextSession(int patid, int GMT_)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            DateTime closest = new DateTime(3000, 01, 01, 00, 00, 00);
            DateTime next = new DateTime(3000, 01, 01, 00, 00, 00);
            DateTime moment = new DateTime(3000, 01, 01, 00, 00, 00);
            moment = NowGiver(GMT_);
            moment = moment.AddHours(-1);
            int closestid = 0;
            string place = "at";

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            DateTime controlTime = DateTime.UtcNow.AddHours(GMT_ - 1);            
            query.CommandText = "SELECT session_place,session_date, id FROM vrsocial.session WHERE session_date > '" + controlTime.ToString("yyyy-MM-dd HH:mm:ss") + "' and patid=" + patid + " AND session_place='-'  order by session_date limit 1";

            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                place = fetch_query["session_place"].ToString();
                next = Convert.ToDateTime(fetch_query["session_date"].ToString());
                closest = next;
                closestid = Convert.ToInt16(fetch_query["id"].ToString());
            }
            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "UPDATE vrsocial.patient SET Next_Session='" + closest.Year + "-" + closest.Month + "-" + closest.Day + "-" + closest.Hour + "-" + closest.Minute + "-" + closest.Second + "' WHERE id=" + patid + "";
            fetch_query = query.ExecuteReader();

            conn.Close();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "UPDATE vrsocial.patient SET next_session_id='" + closestid + "' WHERE id=" + patid + "";
            fetch_query = query.ExecuteReader();
            conn.Close();
            //hastanın seanslarını çek tek tek +
            //session_done ise çekme  +
            //çekerken bi referansla karşılaştır +
            //referans en küçük ve günceli tutsun! +
        }

        //Sıradaki Seansı güncelleme fonksiyonu son

        //Seans başlatınca bool değiştiren fonksiyon başlangıç
        public static void SessionDoner(int sesid, int patid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            int session = 1;
            int check = 0;
            query.CommandText = "SELECT session_number FROM vrsocial.session WHERE patid=" + patid + " AND id=" + sesid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (fetch_query["session_number"].ToString() != "")
                {
                    session = Convert.ToInt16(fetch_query["session_number"].ToString());
                    check = 1;
                }
            }
            conn.Close();

            if (check == 0)
            {
                int bir = 1;
                try
                {
                    conn.Open();
                }
                catch (MySqlException ex)
                {
                    Debug.WriteLine(ex.Message);
                }
                query.CommandText = "SELECT max(session_number) FROM vrsocial.session WHERE patid=" + patid + "";
                fetch_query = query.ExecuteReader();
                while (fetch_query.HasRows && fetch_query.Read())
                {
                    if (fetch_query["max(session_number)"].ToString() != "")
                    {
                        session = Convert.ToInt16(fetch_query["max(session_number)"].ToString()) + 1;
                    }
                }
                conn.Close();

                try
                {
                    conn.Open();
                }
                catch (MySqlException ex)
                {
                    Debug.WriteLine(ex.Message);
                }
                query.CommandText = "UPDATE vrsocial.session SET session_number=" + session + " WHERE id=" + sesid + ";" +
                    "UPDATE vrsocial.session SET session_started=" + bir + " WHERE id=" + sesid + "";
                query.ExecuteReader();
                conn.Close();
            }
        }

        //Seans başlatınca bool değiştiren fonksiyon son

        //Yeni seansı veritabanına yazan fonksiyon başlangıç
        public static void SessionAdder(int patid, int docid, DateTime date, int GMT)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            string line = "-";
            query.CommandText = "INSERT INTO vrsocial.session (docid, patid, session_date,session_place)" +
                "VALUES(@did,@pid,@date,@place)";
            query.Parameters.AddWithValue("@pid", patid);
            query.Parameters.AddWithValue("@date", date);
            query.Parameters.AddWithValue("@did", docid);
            query.Parameters.AddWithValue("@place", line);
            query.ExecuteReader();

            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            //hasan 

            query.CommandText = "SELECT Next_Session FROM vrsocial.patient WHERE id=" + patid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            DateTime current_ns = new DateTime(3000, 1, 1, 0, 0, 0);
            while (fetch_query.HasRows && fetch_query.Read())
            {
                current_ns = Convert.ToDateTime(fetch_query["Next_Session"].ToString());
            }
            conn.Close();

            AdjustNextSession(patid, GMT);
        }

        //Yeni seansı veritabanına yazan fonksiyon son

        //Seans sayısını bulan fonksiyon başlangıç
        public static int SessionFinder(int sesid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            int session = 1;
            query.CommandText = "SELECT session_number FROM vrsocial.session WHERE id=" + sesid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (fetch_query["session_number"].ToString() != "")
                {
                    session = Convert.ToInt16(fetch_query["session_number"].ToString());
                }
            }
            conn.Close();

            return session;
        }

        //Seans sayısını bulan fonksiyon son

        //Yeni exposure'u veritabanına yazan fonksiyon başlangıç
        public static string ExposureAdder(int patid, string initial, string attitude, string place, int docid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            int session = 1;
            query.CommandText = "SELECT max(session_number) FROM vrsocial.session WHERE patid=" + patid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (fetch_query["max(session_number)"].ToString() != "")
                {
                    session = Convert.ToInt16(fetch_query["max(session_number)"].ToString());
                }
            }
            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            int exposure = 1;
            query.CommandText = "SELECT max(exposure_number) FROM vrsocial.exposure WHERE patid=" + patid + " AND session_number =" + session + "";
            fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                if (fetch_query["max(exposure_number)"].ToString() != "")
                {
                    exposure = Convert.ToInt16(fetch_query["max(exposure_number)"].ToString()) + 1;
                }
            }
            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            string seperator = "|";
            query.CommandText = "INSERT INTO vrsocial.exposure (patid,session_number, exposure_number, Initializer, exposure_place, exposure_comments, exposure_comment_timer, heartrate_data, conductance_data)" +
                "VALUES(@patid, @seans, @expo, @init, @place, @pi1, @pi2, @pi3, @pi4)";
            query.Parameters.AddWithValue("@patid", patid);
            query.Parameters.AddWithValue("@seans", session);
            query.Parameters.AddWithValue("@expo", exposure);
            query.Parameters.AddWithValue("@init", initial);
            query.Parameters.AddWithValue("@place", place);
            query.Parameters.AddWithValue("@att", attitude);
            query.Parameters.AddWithValue("@pi1", seperator);
            query.Parameters.AddWithValue("@pi2", seperator);
            query.Parameters.AddWithValue("@pi3", seperator);
            query.Parameters.AddWithValue("@pi4", seperator);
            query.ExecuteReader();

            conn.Close();

            //try
            //{
            //    conn.Open();
            //}
            //catch (MySqlException ex)
            //{
            //    Debug.WriteLine(ex.Message);
            //}

            //query.CommandText = "INSERT INTO vrsocial.soundtable (patid, expoid, sesid)" +
            //   "VALUES(@_patid, @_expoid, @_sesid)";
            //query.Parameters.AddWithValue("@_patid", patid);
            //query.Parameters.AddWithValue("@_expoid", exposure);
            //query.Parameters.AddWithValue("@_sesid", session);
            //query.ExecuteReader();

            //conn.Close();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            query.CommandText = "UPDATE vrsocial.patient SET openSession='" + initial + "' WHERE id=" + patid + ";" +
                "UPDATE vrsocial.doctortable SET openSession='" + initial + "' WHERE id=" + docid + ";" +
                "SELECT id FROM vrsocial.exposure WHERE patid=" + patid + " AND exposure_number=" + exposure + " AND session_number=" + session + ";";
            fetch_query = query.ExecuteReader();
            int a = 0;
            while (fetch_query.HasRows && fetch_query.Read())
            {
                a = Convert.ToInt16(fetch_query["id"].ToString());
            }
            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "UPDATE vrsocial.patient SET expo_id='" + a + "' WHERE id=" + patid + ";" +
            "UPDATE vrsocial.exposure SET avatar_directives = concat(avatar_directives, '" + attitude + "') where id = " + a + ";";
            query.ExecuteReader();

            conn.Close();

            return Convert.ToString(a);
        }

        //Yeni exposure'u veritabanına yazan fonksiyon son

        //Seans sırasında terapist yorumlarını ekleyen fonksiyon başlangıç
        public static List<CommentInfo> commentadder(string comment, int time, int expoid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }

            string from = "1";
            string adder = from + comment + "|";
            string timeadder = Convert.ToString(time) + "|";
            query.CommandText = "UPDATE exposure SET exposure_comments= concat(exposure_comments,'" + adder + "') where id=" + expoid + ";" +
                "UPDATE exposure SET exposure_comment_timer = concat(exposure_comment_timer, '" + timeadder + "') where id = " + expoid + ";";
            query.ExecuteReader();
            conn.Close();

            List<CommentInfo> results = new List<CommentInfo>();
            string comments = "";
            string times = "";

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT exposure_comments,exposure_comment_timer FROM vrsocial.exposure WHERE id=" + expoid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                comments = fetch_query["exposure_comments"].ToString();
                times = fetch_query["exposure_comment_timer"].ToString();
            }
            conn.Close();

            int startindex = 0;
            int endindex = 0;
            int j = 0;
            int length = 0;
            while (startindex < (comments.Length))
            {
                startindex = startindex + 1;
                if (startindex >= comments.Length) break;
                endindex = comments.IndexOf('|', startindex);
                results.Add(new CommentInfo());
                string fromvar = comments.Substring(startindex, 1);
                if (fromvar == "1")
                {
                    results[j].myvar = true;
                }
                else
                {
                    results[j].myvar = false;
                }
                startindex = startindex + 1;
                length = endindex - startindex;
                results[j].msg = comments.Substring(startindex, length);
                startindex = endindex;
                j = j + 1;
            }
            startindex = 0;
            endindex = 0;
            j = 0;
            length = 0;
            int ctime = 0;
            while (startindex < (times.Length))
            {
                startindex = startindex + 1;
                if (startindex >= times.Length) break;
                endindex = times.IndexOf('|', startindex);
                length = endindex - startindex;
                ctime = Convert.ToInt32(times.Substring(startindex, length));
                int ho = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime / 3600)));
                int mi = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 3600) / 60));
                int se = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 60)));
                if (ho == 0)
                {
                    results[j].ctime = "" + checkTime(mi) + ":" + checkTime(se);
                }
                else
                {
                    results[j].ctime = ho + "" + checkTime(mi) + ":" + checkTime(se);
                }
                startindex = endindex;
                j = j + 1;
            }

            return results;
        }

        //Seans sırasında terapist yorumlarını ekleyen fonksiyon son

        //Seans sırasında avatar davranışlarını ekleyen fonksiyon başlangıç
        public static List<CommentInfo> actionadder(string action, string message, int time, int expoid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            string from = "0";
            string adder = from + message + "|";
            string timeadder = Convert.ToString(time) + "|";
            query.CommandText = "UPDATE vrsocial.exposure SET exposure_comments= concat(exposure_comments,'" + adder + "') WHERE id=" + expoid + ";" +
                "UPDATE vrsocial.exposure SET exposure_comment_timer = concat(exposure_comment_timer, '" + timeadder + "') where id = " + expoid + ";" +
                "UPDATE vrsocial.exposure SET avatar_directives = concat(avatar_directives, '" + action + "') where id = " + expoid + ";";
            MySqlDataReader fetch_query = query.ExecuteReader();
            conn.Close();

            List<CommentInfo> results = new List<CommentInfo>();
            string comments = "";
            string times = "";

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT exposure_comments,exposure_comment_timer FROM vrsocial.exposure WHERE id=" + expoid + "";
            fetch_query = query.ExecuteReader();

            while (fetch_query.HasRows && fetch_query.Read())
            {
                comments = fetch_query["exposure_comments"].ToString();
                times = fetch_query["exposure_comment_timer"].ToString();
            }
            conn.Close();

            int startindex = 0;
            int endindex = 0;
            int j = 0;
            int length = 0;
            while (startindex < (comments.Length))
            {
                startindex = startindex + 1;
                if (startindex >= comments.Length) break;
                endindex = comments.IndexOf('|', startindex);
                results.Add(new CommentInfo());
                string fromvar = comments.Substring(startindex, 1);
                if (fromvar == "1")
                {
                    results[j].myvar = true;
                }
                else
                {
                    results[j].myvar = false;
                }
                startindex = startindex + 1;
                length = endindex - startindex;
                results[j].msg = comments.Substring(startindex, length);
                startindex = endindex;
                j = j + 1;
            }
            startindex = 0;
            endindex = 0;
            j = 0;
            length = 0;
            int ctime = 0;
            while (startindex < (times.Length))
            {
                startindex = startindex + 1;
                if (startindex >= times.Length) break;
                endindex = times.IndexOf('|', startindex);
                length = endindex - startindex;
                ctime = Convert.ToInt32(times.Substring(startindex, length));
                int ho = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime / 3600)));
                int mi = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 3600) / 60));
                int se = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 60)));
                if (ho == 0)
                {
                    results[j].ctime = "" + checkTime(mi) + ":" + checkTime(se);
                }
                else
                {
                    results[j].ctime = ho + "" + checkTime(mi) + ":" + checkTime(se);
                }
                startindex = endindex;
                j = j + 1;
            }

            return results;
        }

        //Seans sırasında avatar davranışlarını ekleyen fonksiyon son

        //Seans sırasında biofeedback datalarını ekleyen fonksiyon başlangıç
        public static void dataadder(int expoid, double datagsr, double datappg)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            string gsr = Convert.ToString(datagsr) + "|";
            string ppg = Convert.ToString(datappg) + "|";
            query.CommandText = "UPDATE vrsocial.exposure SET heartrate_data= concat(heartrate_data,'" + ppg + "') WHERE id=" + expoid + ";" +
                "UPDATE vrsocial.exposure SET conductance_data = concat(conductance_data, '" + gsr + "') where id = " + expoid + ";";
            MySqlDataReader fetch_query = query.ExecuteReader();
            conn.Close();
        }

        //Seans sırasında biofeedback datalarını ekleyen fonksiyon son

        //Seans sırasında biofeedback datalarını çeken fonksiyon başlangıç
        public static List<string> datareader(int expoid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            string gsr = "|";
            string ppg = "|";
            query.CommandText = "SELECT heartrate_data, conductance_data FROM vrsocial.exposure where id = " + expoid + ";";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                gsr = fetch_query["heartrate_data"].ToString();
                ppg = fetch_query["conductance_data"].ToString();
            }
            conn.Close();
            List<string> returns = new List<string>();
            gsr = gsr.Substring(0, gsr.LastIndexOf("|"));
            ppg = ppg.Substring(0, ppg.LastIndexOf("|"));
            returns.Add(gsr.Substring(gsr.LastIndexOf("|") + 1));
            returns.Add(ppg.Substring(ppg.LastIndexOf("|") + 1));
            return returns;
        }

        //Seans sırasında biofeedback datalarını ekleyen fonksiyon son

        //Toplam seans sayısını ve exposureları bulan fonksiyonu başlangıç
        public static List<UserInfo> findall(int patid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            List<UserInfo> results = new List<UserInfo>();
            int max_seans = 0;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT max(session_number) FROM vrsocial.exposure WHERE patid=" + patid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();

            while (fetch_query.HasRows && fetch_query.Read())
            {
                max_seans = Convert.ToInt32(fetch_query["max(session_number)"].ToString());
            }
            conn.Close();

            results.Add(new UserInfo());
            results[0].userId = max_seans;
            for (int j = 1; j < max_seans + 1; j++)
            {
                results.Add(new UserInfo());
                try
                {
                    conn.Open();
                }
                catch (MySqlException ex)
                {
                    Debug.WriteLine(ex.Message);
                }
                query.CommandText = "SELECT max(exposure_number) FROM vrsocial.exposure WHERE patid=" + patid + " AND session_number=" + j + "";
                fetch_query = query.ExecuteReader();

                while (fetch_query.HasRows && fetch_query.Read())
                {
                    results[j].userId = Convert.ToInt32(fetch_query["max(exposure_number)"].ToString());
                }
                conn.Close();
            }

            return results;
        }

        //Toplam seans sayısını ve exposureları bulan fonksiyonu son

        //Seans sonu 9999 ekleyen fonksiyon başlangıç
        public static List<CommentInfo> expodone(int expoid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            string action = "9999";
            query.CommandText = "UPDATE vrsocial.exposure SET avatar_directives = concat(avatar_directives, '" + action + "') where id = " + expoid + ";";
            MySqlDataReader fetch_query = query.ExecuteReader();
            conn.Close();

            List<CommentInfo> results = new List<CommentInfo>();
            string comments = "";
            string times = "";

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT exposure_comments,exposure_comment_timer FROM vrsocial.exposure WHERE id=" + expoid + "";
            fetch_query = query.ExecuteReader();

            while (fetch_query.HasRows && fetch_query.Read())
            {
                comments = fetch_query["exposure_comments"].ToString();
                times = fetch_query["exposure_comment_timer"].ToString();
            }
            conn.Close();

            int startindex = 0;
            int endindex = 0;
            int j = 0;
            int length = 0;
            while (startindex < (comments.Length))
            {
                startindex = startindex + 1;
                if (startindex >= comments.Length) break;
                endindex = comments.IndexOf('|', startindex);
                results.Add(new CommentInfo());
                string fromvar = comments.Substring(startindex, 1);
                if (fromvar == "1")
                {
                    results[j].myvar = true;
                }
                else
                {
                    results[j].myvar = false;
                }
                startindex = startindex + 1;
                length = endindex - startindex;
                results[j].msg = comments.Substring(startindex, length);
                startindex = endindex;
                j = j + 1;
            }
            startindex = 0;
            endindex = 0;
            j = 0;
            length = 0;
            int ctime = 0;
            while (startindex < (times.Length))
            {
                startindex = startindex + 1;
                if (startindex >= times.Length) break;
                endindex = times.IndexOf('|', startindex);
                length = endindex - startindex;
                ctime = Convert.ToInt32(times.Substring(startindex, length));
                int ho = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime / 3600)));
                int mi = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 3600) / 60));
                int se = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 60)));
                if (ho == 0)
                {
                    results[j].ctime = "" + checkTime(mi) + ":" + checkTime(se);
                }
                else
                {
                    results[j].ctime = ho + "" + checkTime(mi) + ":" + checkTime(se);
                }
                startindex = endindex;
                j = j + 1;
            }

            return results;
        }

        //Seans sonu 9999 ekleyen fonksiyon son

        //Exposure kapatma fonksiyonu başlangıç
        public static void expo_closer(int patid, int docid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            int zero = 0;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "UPDATE vrsocial.patient SET expo_id='" + zero + "' WHERE id=" + patid + ";" +
                "UPDATE vrsocial.patient SET openSession='" + zero + "' WHERE id=" + patid + ";" +
                "UPDATE vrsocial.doctortable SET openSession='" + zero + "' WHERE id=" + docid + ";";
            query.ExecuteReader();
            conn.Close();
        }

        //Exposure kapatma fonksiyonu son

        //Seans detaylarını alma (kaydolmamış seans) fonksiyonu başlangıç
        public static CommentInfoEnd endexpo_first(int patid, int session_no, int exposure_no)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            List<CommentInfo> results = new List<CommentInfo>();
            CommentInfoEnd result = new CommentInfoEnd();

            List<BioData> GSRlist = new List<BioData>();
            List<BioData> HRlist = new List<BioData>();
            string comments = "";
            string times = "";
            string GSR = "";
            string HR = "";

            int id = 0;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT id FROM vrsocial.exposure WHERE patid=" + patid + " AND session_number=" + session_no + " AND exposure_number=" + exposure_no + "";
            MySqlDataReader fetch_query = query.ExecuteReader();

            while (fetch_query.HasRows && fetch_query.Read())
            {
                id = Convert.ToInt32(fetch_query["id"].ToString());
            }
            conn.Close();

            result.ExpoId = id;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT exposure_comments,exposure_comment_timer,conductance_data,heartrate_data FROM vrsocial.exposure WHERE id=" + id + "";
            fetch_query = query.ExecuteReader();

            while (fetch_query.HasRows && fetch_query.Read())
            {
                comments = fetch_query["exposure_comments"].ToString();
                times = fetch_query["exposure_comment_timer"].ToString();
                GSR = fetch_query["conductance_data"].ToString();
                HR = fetch_query["heartrate_data"].ToString();
            }
            conn.Close();

            int startindex = 0;
            int endindex = 0;
            int j = 0;
            int length = 0;
            while (startindex < (comments.Length))
            {
                startindex = startindex + 1;
                if (startindex >= comments.Length) break;
                endindex = comments.IndexOf('|', startindex);
                results.Add(new CommentInfo());
                string fromvar = comments.Substring(startindex, 1);
                if (fromvar == "1")
                {
                    results[j].myvar = true;
                }
                else
                {
                    results[j].myvar = false;
                }
                startindex = startindex + 1;
                length = endindex - startindex;
                results[j].msg = comments.Substring(startindex, length);
                startindex = endindex;
                j = j + 1;
            }
            startindex = 0;
            endindex = 0;
            j = 0;
            length = 0;
            int ctime = 0;
            while (startindex < (times.Length))
            {
                startindex = startindex + 1;
                if (startindex >= times.Length) break;
                endindex = times.IndexOf('|', startindex);
                length = endindex - startindex;
                ctime = Convert.ToInt32(times.Substring(startindex, length));
                int ho = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime / 3600)));
                int mi = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 3600) / 60));
                int se = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 60)));
                if (ho == 0)
                {
                    results[j].ctime = "" + checkTime(mi) + ":" + checkTime(se);
                }
                else
                {
                    results[j].ctime = ho + "" + checkTime(mi) + ":" + checkTime(se);
                }
                startindex = endindex;
                j = j + 1;
            }
            startindex = 0;
            endindex = 0;
            j = 0;
            length = 0;
            string dull;
            while (startindex < (GSR.Length))
            {
                startindex = startindex + 1;
                if (startindex >= GSR.Length) break;
                endindex = GSR.IndexOf('|', startindex);
                GSRlist.Add(new BioData());
                GSRlist[j].x = j;
                length = endindex - startindex;
                dull = GSR.Substring(startindex, length);
                dull = dull.Replace('.', ',');
                GSRlist[j].y = Convert.ToDouble(dull);
                startindex = endindex;
                j = j + 1;
            }
            startindex = 0;
            endindex = 0;
            j = 0;
            length = 0;
            while (startindex < (HR.Length))
            {
                startindex = startindex + 1;
                if (startindex >= HR.Length) break;
                endindex = HR.IndexOf('|', startindex);
                HRlist.Add(new BioData());
                HRlist[j].x = j;
                length = endindex - startindex;
                HRlist[j].y = Convert.ToDouble(HR.Substring(startindex, length));
                startindex = endindex;
                j = j + 1;
            }
            if (HRlist.Capacity == 0)
            {
                for (int i = 0; i < 100; i++)
                {
                    HRlist.Add(new BioData());
                    HRlist[i].x = i;
                    GSRlist.Add(new BioData());
                    GSRlist[i].x = i;
                }
            }
            result.HR = HRlist;
            result.GSR = GSRlist;

            result.comments = results;

            return result;
        }

        //Seans detaylarını alma (kaydolmamış seans) fonksiyonu son

        //Seans detaylarını alma (kaydolmuş seans) fonksiyonu başlangıç
        public static CommentInfoEnd endexpo_last(int patid, int session_no, int exposure_no)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            CommentInfoEnd result = new CommentInfoEnd();
            List<CommentInfo> results = new List<CommentInfo>();
            List<BioData> GSRlist = new List<BioData>();
            List<BioData> HRlist = new List<BioData>();
            string comments = "";
            string times = "";
            string GSR = "";
            string HR = "";
            int id = 0;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT id FROM vrsocial.exposure WHERE patid=" + patid + " AND session_number=" + session_no + " AND exposure_number=" + exposure_no + "";
            MySqlDataReader fetch_query = query.ExecuteReader();

            while (fetch_query.HasRows && fetch_query.Read())
            {
                id = Convert.ToInt32(fetch_query["id"].ToString());
            }

            result.ExpoId = id;

            conn.Close();

            string doc = "";
            string pat = "";
            Int32 nerv = 0;
            int conf = 0;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT exposure_comments,exposure_comment_timer,nervousness,confidence,doc_comment,pat_comment,conductance_data,heartrate_data  FROM vrsocial.exposure WHERE id=" + id + "";
            fetch_query = query.ExecuteReader();

            while (fetch_query.HasRows && fetch_query.Read())
            {
                comments = fetch_query["exposure_comments"].ToString();
                times = fetch_query["exposure_comment_timer"].ToString();
                nerv = Convert.ToInt32(fetch_query["nervousness"].ToString());
                conf = Convert.ToInt32(fetch_query["confidence"].ToString());
                doc = fetch_query["doc_comment"].ToString();
                pat = fetch_query["pat_comment"].ToString();
                GSR = fetch_query["conductance_data"].ToString();
                HR = fetch_query["heartrate_data"].ToString();
            }
            conn.Close();

            int startindex = 0;
            int endindex = 0;
            int j = 0;
            int length = 0;
            while (startindex < (comments.Length))
            {
                startindex = startindex + 1;
                if (startindex >= comments.Length) break;
                endindex = comments.IndexOf('|', startindex);
                results.Add(new CommentInfo());
                string fromvar = comments.Substring(startindex, 1);
                if (fromvar == "1")
                {
                    results[j].myvar = true;
                }
                else
                {
                    results[j].myvar = false;
                }
                startindex = startindex + 1;
                length = endindex - startindex;
                results[j].msg = comments.Substring(startindex, length);
                startindex = endindex;
                j = j + 1;
            }
            startindex = 0;
            endindex = 0;
            j = 0;
            length = 0;
            int ctime = 0;
            while (startindex < (times.Length))
            {
                startindex = startindex + 1;
                if (startindex >= times.Length) break;
                endindex = times.IndexOf('|', startindex);
                length = endindex - startindex;
                ctime = Convert.ToInt32(times.Substring(startindex, length));
                int ho = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime / 3600)));
                int mi = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 3600) / 60));
                int se = Convert.ToInt16(Math.Floor(Convert.ToDecimal(ctime % 60)));
                if (ho == 0)
                {
                    results[j].ctime = "" + checkTime(mi) + ":" + checkTime(se);
                }
                else
                {
                    results[j].ctime = ho + "" + checkTime(mi) + ":" + checkTime(se);
                }
                startindex = endindex;
                j = j + 1;
            }
            startindex = 0;
            endindex = 0;
            j = 0;
            length = 0;
            string dull;
            while (startindex < (GSR.Length))
            {
                startindex = startindex + 1;
                if (startindex >= GSR.Length) break;
                endindex = GSR.IndexOf('|', startindex);
                GSRlist.Add(new BioData());
                GSRlist[j].x = j;
                length = endindex - startindex;
                dull = GSR.Substring(startindex, length);
                dull = dull.Replace('.', ',');
                GSRlist[j].y = Convert.ToDouble(dull);
                startindex = endindex;
                j = j + 1;
            }
            startindex = 0;
            endindex = 0;
            j = 0;
            length = 0;
            while (startindex < (HR.Length))
            {
                startindex = startindex + 1;
                if (startindex >= HR.Length) break;
                endindex = HR.IndexOf('|', startindex);
                HRlist.Add(new BioData());
                HRlist[j].x = j;
                length = endindex - startindex;
                HRlist[j].y = Convert.ToDouble(HR.Substring(startindex, length));
                startindex = endindex;
                j = j + 1;
            }

            if (HRlist.Capacity == 0)
            {
                for (int i = 0; i < 100; i++)
                {
                    HRlist.Add(new BioData());
                    HRlist[i].x = i;
                    GSRlist.Add(new BioData());
                    GSRlist[i].x = i;
                }
            }

            result.HR = HRlist;
            result.GSR = GSRlist;
            result.comments = results;
            result.conf = conf;
            result.nerv = nerv;
            result.doc_com = doc;
            result.pat_com = pat;

            return result;
        }

        //Seans detaylarını alma (kaydolmuş seans) fonksiyonu son

        //Seans sonu yorum ve gerginlik değerlerinin kaydı başlangıç
        public static void endexposaver(string doc_comment, string pat_comment, int nerv, int conf, int patid, int session, int exposure)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "UPDATE vrsocial.exposure SET doc_comment= '" + doc_comment + "' WHERE patid=" + patid + " AND session_number =" + session + " AND exposure_number =" + exposure + ";" +
                "UPDATE vrsocial.exposure SET pat_comment = '" + pat_comment + "' WHERE patid = " + patid + "  AND session_number =" + session + " AND exposure_number =" + exposure + ";" +
                "UPDATE vrsocial.exposure SET nervousness = '" + nerv + "' WHERE patid = " + patid + "  AND session_number = " + session + " AND exposure_number = " + exposure + "; " +
                "UPDATE vrsocial.exposure SET confidence  = '" + conf + "' WHERE patid = " + patid + "  AND session_number =" + session + " AND exposure_number =" + exposure + ";";
            MySqlDataReader fetch_query = query.ExecuteReader();
            conn.Close();
        }

        //Seans sonu yorum ve gerginlik değerlerinin kaydı son

        //Seans sonu seans bitirildi yazısının kaydı başlangıç
        public static int sessiondone(int patid, int session, int docid, int GMT)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            string check = "Yapıldı";
            query.CommandText = "UPDATE vrsocial.session SET session_place = '" + check + "' WHERE id = " + session + " ; ";
            MySqlDataReader fetch_query = query.ExecuteReader();
            conn.Close();

            int remaining_ses = session_counter_decrease(docid);

            DateTime closest = new DateTime(3000, 01, 01, 00, 00, 00);
            DateTime next = new DateTime(3000, 01, 01, 00, 00, 00);
            DateTime moment = new DateTime(3000, 01, 01, 00, 00, 00);
            moment = NowGiver(GMT);
            moment = moment.AddHours(-1);
            int closestid = 0;
            string place = "at";

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
           
            DateTime controlTime = DateTime.UtcNow.AddHours(GMT - 1);
            query.CommandText = "SELECT session_place,session_date, id FROM vrsocial.session WHERE session_date > '" + controlTime.ToString("yyyy-MM-dd HH:mm:ss") + "' and patid=" + patid + " AND session_place='-'  order by session_date limit 1";

            fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                place = fetch_query["session_place"].ToString();
                next = Convert.ToDateTime(fetch_query["session_date"].ToString());
                closest = next;
                closestid = Convert.ToInt16(fetch_query["id"].ToString());
            }


            conn.Close();

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "UPDATE vrsocial.patient SET Next_Session='" + closest.Year + "-" + closest.Month + "-" + closest.Day + "-" + closest.Hour + "-" + closest.Minute + "-" + closest.Second + "' WHERE id=" + patid + "";
            fetch_query = query.ExecuteReader();

            conn.Close();
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "UPDATE vrsocial.patient SET next_session_id='" + closestid + "' WHERE id=" + patid + "";
            fetch_query = query.ExecuteReader();
            conn.Close();
            AdjustNextSession(patid, GMT);

            return remaining_ses;
        }

        //Seans sonu seans bitirildi yazısının kaydı son

        //Exposuredaki seans kaydını alan fonksiyon başlangıç
        public static List<AudioData> GetSesAudio(int patid, int session_no, int exposure_no)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();
            List<AudioData> result = new List<AudioData>();
            int j = 0;
            int expoid = 0;

            // GetSesAudio(int patid, int session_no, int exposure_no)
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT id FROM vrsocial.exposure WHERE patid=" + patid + " AND session_number =" + session_no + " AND exposure_number =" + exposure_no + ";";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                expoid = Convert.ToInt16(fetch_query["id"].ToString());
            }
            conn.Close();

            expoid = 1601;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            string gecici;
            query.CommandText = "SELECT indexAudio, startTime, EndTime,audios FROM vrsocial.audio WHERE sessionid=" + expoid + "";
            fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                result.Add(new AudioData());
                result[j].index = Convert.ToInt16(fetch_query["indexAudio"].ToString());
                result[j].StartTime = Convert.ToDateTime(fetch_query["startTime"].ToString());
                result[j].StartTime = Convert.ToDateTime(fetch_query["EndTime"].ToString());
                gecici = fetch_query.GetString(3);
                result[j].clip = Convert.FromBase64String(gecici);
                j = j + 1;
            }
            conn.Close();

            return result;
        }

        //Exposuredaki seans kaydını alan fonksiyon son

        //Davranış xml'inin switch-case modeli başlangıç
        public static string attitudefinder(string attitude)
        {
            string result = "";

            switch (attitude)
            {
                case "5000":
                    result = "000";
                    break;

                case "0500":
                    result = "001";
                    break;

                case "0050":
                    result = "002";
                    break;

                case "0005":
                    result = "003";
                    break;

                case "4100":
                    result = "004";
                    break;

                case "4010":
                    result = "005";
                    break;

                case "4001":
                    result = "006";
                    break;

                case "4000":
                    result = "007";
                    break;

                case "1400":
                    result = "008";
                    break;

                case "0410":
                    result = "009";
                    break;

                case "0401":
                    result = "010";
                    break;

                case "0400":
                    result = "011";
                    break;

                case "1040":
                    result = "012";
                    break;

                case "0140":
                    result = "013";
                    break;

                case "0041":
                    result = "014";
                    break;

                case "0040":
                    result = "015";
                    break;

                case "1004":
                    result = "016";
                    break;

                case "0104":
                    result = "017";
                    break;

                case "0014":
                    result = "018";
                    break;

                case "0004":
                    result = "019";
                    break;

                case "3200":
                    result = "020";
                    break;

                case "3020":
                    result = "021";
                    break;

                case "3002":
                    result = "022";
                    break;

                case "3110":
                    result = "023";
                    break;

                case "3101":
                    result = "024";
                    break;

                case "3011":
                    result = "025";
                    break;

                case "3100":
                    result = "026";
                    break;

                case "3010":
                    result = "027";
                    break;

                case "3001":
                    result = "028";
                    break;

                case "3000":
                    result = "029";
                    break;

                case "2300":
                    result = "030";
                    break;

                case "0320":
                    result = "031";
                    break;

                case "0302":
                    result = "032";
                    break;

                case "1310":
                    result = "033";
                    break;

                case "1301":
                    result = "034";
                    break;

                case "0311":
                    result = "035";
                    break;

                case "1300":
                    result = "036";
                    break;

                case "0310":
                    result = "037";
                    break;

                case "0301":
                    result = "038";
                    break;

                case "0300":
                    result = "039";
                    break;

                case "2030":
                    result = "040";
                    break;

                case "0230":
                    result = "041";
                    break;

                case "0032":
                    result = "042";
                    break;

                case "1130":
                    result = "043";
                    break;

                case "1031":
                    result = "044";
                    break;

                case "0131":
                    result = "045";
                    break;

                case "1030":
                    result = "046";
                    break;

                case "0130":
                    result = "047";
                    break;

                case "0031":
                    result = "048";
                    break;

                case "0030":
                    result = "049";
                    break;

                case "2003":
                    result = "050";
                    break;

                case "0203":
                    result = "051";
                    break;

                case "0023":
                    result = "052";
                    break;

                case "1103":
                    result = "053";
                    break;

                case "1013":
                    result = "054";
                    break;

                case "0113":
                    result = "055";
                    break;

                case "1003":
                    result = "056";
                    break;

                case "0103":
                    result = "057";
                    break;

                case "0013":
                    result = "058";
                    break;

                case "0003":
                    result = "059";
                    break;

                case "2111":
                    result = "060";
                    break;

                case "2110":
                    result = "061";
                    break;

                case "2101":
                    result = "062";
                    break;

                case "2011":
                    result = "063";
                    break;

                case "2100":
                    result = "064";
                    break;

                case "2010":
                    result = "065";
                    break;

                case "2001":
                    result = "066";
                    break;

                case "2000":
                    result = "067";
                    break;

                case "1211":
                    result = "068";
                    break;

                case "1210":
                    result = "069";
                    break;

                case "1201":
                    result = "070";
                    break;

                case "0211":
                    result = "071";
                    break;

                case "1200":
                    result = "072";
                    break;

                case "0210":
                    result = "073";
                    break;

                case "0201":
                    result = "074";
                    break;

                case "0200":
                    result = "075";
                    break;

                case "1121":
                    result = "076";
                    break;

                case "1120":
                    result = "077";
                    break;

                case "1021":
                    result = "078";
                    break;

                case "0121":
                    result = "079";
                    break;

                case "1020":
                    result = "080";
                    break;

                case "0120":
                    result = "081";
                    break;

                case "0021":
                    result = "082";
                    break;

                case "0020":
                    result = "083";
                    break;

                case "1112":
                    result = "084";
                    break;

                case "1102":
                    result = "085";
                    break;

                case "1012":
                    result = "086";
                    break;

                case "0112":
                    result = "087";
                    break;

                case "1002":
                    result = "088";
                    break;

                case "0102":
                    result = "089";
                    break;

                case "0012":
                    result = "090";
                    break;

                case "0002":
                    result = "091";
                    break;

                case "2210":
                    result = "092";
                    break;

                case "2201":
                    result = "093";
                    break;

                case "2200":
                    result = "094";
                    break;

                case "2120":
                    result = "095";
                    break;

                case "2021":
                    result = "096";
                    break;

                case "2020":
                    result = "097";
                    break;

                case "2102":
                    result = "098";
                    break;

                case "2012":
                    result = "099";
                    break;

                case "2002":
                    result = "100";
                    break;

                case "1220":
                    result = "101";
                    break;

                case "0221":
                    result = "102";
                    break;

                case "0220":
                    result = "103";
                    break;

                case "1202":
                    result = "104";
                    break;

                case "0212":
                    result = "105";
                    break;

                case "0202":
                    result = "106";
                    break;

                case "1022":
                    result = "107";
                    break;

                case "0122":
                    result = "108";
                    break;

                case "0022":
                    result = "109";
                    break;

                case "1111":
                    result = "110";
                    break;

                case "1110":
                    result = "111";
                    break;

                case "1101":
                    result = "112";
                    break;

                case "1011":
                    result = "113";
                    break;

                case "0111":
                    result = "114";
                    break;

                case "1100":
                    result = "115";
                    break;

                case "1010":
                    result = "116";
                    break;

                case "1001":
                    result = "117";
                    break;

                case "0110":
                    result = "118";
                    break;

                case "0101":
                    result = "119";
                    break;

                case "0011":
                    result = "120";
                    break;

                case "1000":
                    result = "121";
                    break;

                case "0100":
                    result = "122";
                    break;

                case "0010":
                    result = "123";
                    break;

                case "0001":
                    result = "124";
                    break;

                case "100000":
                    result = "125";
                    break;

                case "010000":
                    result = "126";
                    break;

                case "001000":
                    result = "127";
                    break;

                case "000100":
                    result = "128";
                    break;

                case "752500":
                    result = "129";
                    break;

                case "750250":
                    result = "130";
                    break;

                case "750025":
                    result = "131";
                    break;

                case "257500":
                    result = "132";
                    break;

                case "075250":
                    result = "133";
                    break;

                case "075025":
                    result = "134";
                    break;

                case "250750":
                    result = "135";
                    break;

                case "025750":
                    result = "136";
                    break;

                case "007525":
                    result = "137";
                    break;

                case "250075":
                    result = "138";
                    break;

                case "025075":
                    result = "139";
                    break;

                case "002575":
                    result = "140";
                    break;

                case "505000":
                    result = "141";
                    break;

                case "500500":
                    result = "142";
                    break;

                case "500050":
                    result = "143";
                    break;

                case "5025250":
                    result = "144";
                    break;

                case "5025025":
                    result = "145";
                    break;

                case "5002525":
                    result = "146";
                    break;

                case "050500":
                    result = "147";
                    break;

                case "050050":
                    result = "148";
                    break;

                case "2550250":
                    result = "149";
                    break;

                case "2550025":
                    result = "150";
                    break;

                case "0502525":
                    result = "151";
                    break;

                case "005050":
                    result = "152";
                    break;

                case "2525500":
                    result = "153";
                    break;

                case "2505025":
                    result = "154";
                    break;

                case "0255025":
                    result = "155";
                    break;

                case "2525050":
                    result = "156";
                    break;

                case "2502550":
                    result = "157";
                    break;

                case "0252550":
                    result = "158";
                    break;

                case "25252525":
                    result = "159";
                    break;
            }

            return result;
        }

        //Davranış xml'inin switch-case modeli son

        //Genç ağırlıklı avatar dağılımı başlangıç
        public static List<Int32> youngavatar(string gender, int randomnumber)
        {
            List<Int32> result = new List<Int32>();
            Random rnd1 = new Random();

            switch (gender)
            {
                case "50":
                    result.Add(0);
                    result.Add(1);
                    result.Add(2);
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(3, 6));
                        result.Add(rnd1.Next(6, 9));
                    }
                    else
                    {
                        int b = rnd1.Next(3, 6);
                        if (b == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (b == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                    }
                    break;

                case "41":
                    result.Add(0);
                    result.Add(1);
                    result.Add(2);
                    result.Add(rnd1.Next(3, 6));
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(18, 21));
                    }
                    else
                    {
                        result.Add(rnd1.Next(21, 24));
                    }
                    break;

                case "40":
                    result.Add(0);
                    result.Add(1);
                    result.Add(2);
                    result.Add(rnd1.Next(3, 6));
                    break;

                case "32":
                    if (randomnumber % 3 == 1)
                    {
                        result.Add(0);
                        result.Add(1);
                        result.Add(2);
                        int b = rnd1.Next(18, 21);
                        if (b == 18)
                        {
                            result.Add(19);
                            result.Add(20);
                        }
                        else if (b == 19)
                        {
                            result.Add(18);
                            result.Add(20);
                        }
                        else
                        {
                            result.Add(18);
                            result.Add(19);
                        }
                    }
                    else if (randomnumber % 3 == 2)
                    {
                        result.Add(0);
                        result.Add(1);
                        result.Add(2);
                        result.Add(rnd1.Next(18, 21));
                        result.Add(rnd1.Next(21, 24));
                    }
                    else
                    {
                        int b = rnd1.Next(0, 3);
                        if (b == 0)
                        {
                            result.Add(1);
                            result.Add(2);
                        }
                        else if (b == 1)
                        {
                            result.Add(0);
                            result.Add(2);
                        }
                        else
                        {
                            result.Add(0);
                            result.Add(1);
                        }
                        result.Add(rnd1.Next(3, 6));

                        b = rnd1.Next(18, 21);
                        if (b == 18)
                        {
                            result.Add(19);
                            result.Add(20);
                        }
                        else if (b == 19)
                        {
                            result.Add(18);
                            result.Add(20);
                        }
                        else
                        {
                            result.Add(18);
                            result.Add(19);
                        }
                    }
                    break;

                case "31":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(0);
                        result.Add(1);
                        result.Add(2);
                    }
                    else
                    {
                        int b = rnd1.Next(0, 3);
                        if (b == 0)
                        {
                            result.Add(1);
                            result.Add(2);
                        }
                        else if (b == 1)
                        {
                            result.Add(0);
                            result.Add(2);
                        }
                        else
                        {
                            result.Add(0);
                            result.Add(1);
                        }
                        result.Add(rnd1.Next(3, 6));
                    }
                    result.Add(rnd1.Next(18, 21));
                    break;

                case "30":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(0);
                        result.Add(1);
                        result.Add(2);
                    }
                    else
                    {
                        int b = rnd1.Next(0, 3);
                        if (b == 0)
                        {
                            result.Add(1);
                            result.Add(2);
                        }
                        else if (b == 1)
                        {
                            result.Add(0);
                            result.Add(2);
                        }
                        else
                        {
                            result.Add(0);
                            result.Add(1);
                        }
                        result.Add(rnd1.Next(3, 6));
                    }
                    break;

                case "23":
                    if (randomnumber % 3 == 1)
                    {
                        int b = rnd1.Next(0, 3);
                        if (b == 0)
                        {
                            result.Add(1);
                            result.Add(2);
                        }
                        else if (b == 1)
                        {
                            result.Add(0);
                            result.Add(2);
                        }
                        else
                        {
                            result.Add(0);
                            result.Add(1);
                        }
                        result.Add(18);
                        result.Add(19);
                        result.Add(20);
                    }
                    else if (randomnumber % 3 == 2)
                    {
                        result.Add(rnd1.Next(0, 3));
                        result.Add(rnd1.Next(3, 6));
                        result.Add(18);
                        result.Add(19);
                        result.Add(20);
                    }
                    else
                    {
                        int b = rnd1.Next(0, 3);
                        if (b == 0)
                        {
                            result.Add(1);
                            result.Add(2);
                        }
                        else if (b == 1)
                        {
                            result.Add(0);
                            result.Add(2);
                        }
                        else
                        {
                            result.Add(0);
                            result.Add(1);
                        }

                        b = rnd1.Next(18, 21);
                        if (b == 18)
                        {
                            result.Add(19);
                            result.Add(20);
                        }
                        else if (b == 19)
                        {
                            result.Add(18);
                            result.Add(20);
                        }
                        else
                        {
                            result.Add(18);
                            result.Add(19);
                        }
                        result.Add(rnd1.Next(21, 24));
                    }
                    break;

                case "22":
                    if (randomnumber % 3 == 1)
                    {
                        int b = rnd1.Next(0, 3);
                        if (b == 0)
                        {
                            result.Add(1);
                            result.Add(2);
                        }
                        else if (b == 1)
                        {
                            result.Add(0);
                            result.Add(2);
                        }
                        else
                        {
                            result.Add(0);
                            result.Add(1);
                        }
                        b = rnd1.Next(18, 21);
                        if (b == 18)
                        {
                            result.Add(19);
                            result.Add(20);
                        }
                        else if (b == 19)
                        {
                            result.Add(18);
                            result.Add(20);
                        }
                        else
                        {
                            result.Add(18);
                            result.Add(19);
                        }
                    }
                    else if (randomnumber % 3 == 2)
                    {
                        int b = rnd1.Next(0, 3);
                        if (b == 0)
                        {
                            result.Add(1);
                            result.Add(2);
                        }
                        else if (b == 1)
                        {
                            result.Add(0);
                            result.Add(2);
                        }
                        else
                        {
                            result.Add(0);
                            result.Add(1);
                        }
                        result.Add(rnd1.Next(18, 21));
                        result.Add(rnd1.Next(21, 24));
                    }
                    else
                    {
                        result.Add(rnd1.Next(0, 3));
                        result.Add(rnd1.Next(3, 6));
                        int b = rnd1.Next(18, 21);
                        if (b == 18)
                        {
                            result.Add(19);
                            result.Add(20);
                        }
                        else if (b == 19)
                        {
                            result.Add(18);
                            result.Add(20);
                        }
                        else
                        {
                            result.Add(18);
                            result.Add(19);
                        }
                    }
                    break;

                case "21":
                    if (randomnumber % 2 == 1)
                    {
                        int b = rnd1.Next(0, 3);
                        if (b == 0)
                        {
                            result.Add(1);
                            result.Add(2);
                        }
                        else if (b == 1)
                        {
                            result.Add(0);
                            result.Add(2);
                        }
                        else
                        {
                            result.Add(0);
                            result.Add(1);
                        }
                    }
                    else
                    {
                        result.Add(rnd1.Next(0, 3));
                        result.Add(rnd1.Next(3, 6));
                    }
                    result.Add(rnd1.Next(18, 21));
                    break;

                case "20":
                    int c = rnd1.Next(0, 3);
                    if (c == 0)
                    {
                        result.Add(1);
                        result.Add(2);
                    }
                    else if (c == 1)
                    {
                        result.Add(0);
                        result.Add(2);
                    }
                    else
                    {
                        result.Add(0);
                        result.Add(1);
                    }
                    break;

                case "14":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(0, 3));
                    }
                    else
                    {
                        result.Add(rnd1.Next(3, 6));
                    }
                    result.Add(18);
                    result.Add(19);
                    result.Add(20);
                    result.Add(rnd1.Next(21, 24));
                    break;

                case "13":
                    result.Add(rnd1.Next(0, 3));
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(18);
                        result.Add(19);
                        result.Add(20);
                    }
                    else
                    {
                        int b = rnd1.Next(18, 21);
                        if (b == 18)
                        {
                            result.Add(19);
                            result.Add(20);
                        }
                        else if (b == 19)
                        {
                            result.Add(18);
                            result.Add(20);
                        }
                        else
                        {
                            result.Add(18);
                            result.Add(19);
                        }
                        result.Add(rnd1.Next(21, 24));
                    }
                    break;

                case "12":
                    result.Add(rnd1.Next(0, 3));
                    if (randomnumber % 2 == 1)
                    {
                        int b = rnd1.Next(18, 21);
                        if (b == 18)
                        {
                            result.Add(19);
                            result.Add(20);
                        }
                        else if (b == 1)
                        {
                            result.Add(18);
                            result.Add(20);
                        }
                        else
                        {
                            result.Add(18);
                            result.Add(19);
                        }
                    }
                    else
                    {
                        result.Add(rnd1.Next(18, 21));
                        result.Add(rnd1.Next(21, 24));
                    }
                    break;

                case "11":
                    result.Add(rnd1.Next(0, 3));
                    result.Add(rnd1.Next(18, 21));
                    break;

                case "10":
                    result.Add(rnd1.Next(0, 3));
                    break;

                case "05":
                    result.Add(18);
                    result.Add(19);
                    result.Add(20);
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(21, 24));
                        result.Add(rnd1.Next(24, 27));
                    }
                    else
                    {
                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                    }
                    break;

                case "04":
                    result.Add(18);
                    result.Add(19);
                    result.Add(20);
                    result.Add(rnd1.Next(21, 24));
                    break;

                case "03":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(18);
                        result.Add(19);
                        result.Add(20);
                    }
                    else
                    {
                        int b = rnd1.Next(18, 21);
                        if (b == 18)
                        {
                            result.Add(19);
                            result.Add(20);
                        }
                        else if (b == 19)
                        {
                            result.Add(18);
                            result.Add(20);
                        }
                        else
                        {
                            result.Add(18);
                            result.Add(19);
                        }
                        result.Add(rnd1.Next(21, 24));
                    }
                    break;

                case "02":
                    int d = rnd1.Next(18, 21);
                    if (d == 18)
                    {
                        result.Add(19);
                        result.Add(20);
                    }
                    else if (d == 19)
                    {
                        result.Add(18);
                        result.Add(20);
                    }
                    else
                    {
                        result.Add(18);
                        result.Add(19);
                    }
                    break;

                case "01":
                    result.Add(rnd1.Next(18, 21));
                    break;
            }
            return result;
        }

        //Genç ağırlıklı avatar dağılımı son

        //Orta Yaşlı ağırlıklı avatar dağılımı başlangıç
        public static List<Int32> middleavatar(string gender, int randomnumber)
        {
            List<Int32> result = new List<Int32>();
            Random rnd1 = new Random();

            switch (gender)
            {
                case "50":
                    result.Add(3);
                    result.Add(4);
                    result.Add(5);
                    result.Add(rnd1.Next(0, 3));
                    result.Add(rnd1.Next(6, 9));
                    break;

                case "41":
                    result.Add(3);
                    result.Add(4);
                    result.Add(5);
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(0, 3));
                    }
                    else
                    {
                        result.Add(rnd1.Next(6, 9));
                    }
                    result.Add(rnd1.Next(21, 24));
                    break;

                case "40":
                    result.Add(3);
                    result.Add(4);
                    result.Add(5);
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(0, 3));
                    }
                    else
                    {
                        result.Add(rnd1.Next(6, 9));
                    }
                    break;

                case "32":
                    if (randomnumber % 5 == 4)
                    {
                        result.Add(3);
                        result.Add(4);
                        result.Add(5);
                        result.Add(rnd1.Next(21, 24));
                        result.Add(rnd1.Next(18, 21));
                    }
                    else if (randomnumber % 5 == 3)
                    {
                        result.Add(3);
                        result.Add(4);
                        result.Add(5);
                        result.Add(rnd1.Next(21, 24));
                        result.Add(rnd1.Next(24, 27));
                    }
                    else if (randomnumber % 5 == 2)
                    {
                        result.Add(3);
                        result.Add(4);
                        result.Add(5);
                        int a = rnd1.Next(21, 24);
                        if (a == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (a == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                    }
                    else if (randomnumber % 5 == 1)
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                        result.Add(rnd1.Next(0, 3));

                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                    }
                    else
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                        result.Add(rnd1.Next(6, 9));

                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                    }
                    break;

                case "31":
                    if (randomnumber % 3 == 2)
                    {
                        result.Add(3);
                        result.Add(4);
                        result.Add(5);
                    }
                    else if (randomnumber % 3 == 1)
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                        result.Add(rnd1.Next(0, 3));
                    }
                    else
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                        result.Add(rnd1.Next(6, 9));
                    }
                    result.Add(rnd1.Next(21, 24));
                    break;

                case "30":
                    if (randomnumber % 3 == 2)
                    {
                        result.Add(3);
                        result.Add(4);
                        result.Add(5);
                    }
                    else if (randomnumber % 3 == 1)
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                        result.Add(rnd1.Next(0, 3));
                    }
                    else
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                        result.Add(rnd1.Next(6, 9));
                    }
                    break;

                case "23":
                    if (randomnumber % 5 == 4)
                    {
                        result.Add(rnd1.Next(3, 6));
                        result.Add(rnd1.Next(0, 3));
                        result.Add(21);
                        result.Add(22);
                        result.Add(23);
                    }
                    else if (randomnumber % 5 == 3)
                    {
                        result.Add(rnd1.Next(3, 6));
                        result.Add(rnd1.Next(6, 9));
                        result.Add(21);
                        result.Add(22);
                        result.Add(23);
                    }
                    else if (randomnumber % 5 == 2)
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }

                        result.Add(21);
                        result.Add(22);
                        result.Add(23);
                    }
                    else if (randomnumber % 5 == 1)
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }

                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                        result.Add(rnd1.Next(18, 21));
                    }
                    else
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }

                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }

                        result.Add(rnd1.Next(24, 27));
                    }
                    break;

                case "22":
                    if (randomnumber % 5 == 4)
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }

                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                    }
                    else if (randomnumber % 5 == 3)
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                        result.Add(rnd1.Next(18, 21));
                        result.Add(rnd1.Next(21, 24));
                    }
                    else if (randomnumber % 5 == 2)
                    {
                        int a = rnd1.Next(3, 6);
                        if (a == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (a == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                        result.Add(rnd1.Next(24, 27));
                        result.Add(rnd1.Next(21, 24));
                    }
                    else if (randomnumber % 5 == 1)
                    {
                        result.Add(rnd1.Next(0, 3));
                        result.Add(rnd1.Next(3, 6));

                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                    }
                    else
                    {
                        result.Add(rnd1.Next(6, 9));
                        result.Add(rnd1.Next(3, 6));

                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                    }
                    break;

                case "21":
                    int e = rnd1.Next(3, 6);
                    if (e == 3)
                    {
                        result.Add(4);
                        result.Add(5);
                    }
                    else if (e == 4)
                    {
                        result.Add(3);
                        result.Add(5);
                    }
                    else
                    {
                        result.Add(3);
                        result.Add(4);
                    }
                    result.Add(rnd1.Next(21, 24));
                    break;

                case "20":
                    int f = rnd1.Next(3, 6);
                    if (f == 3)
                    {
                        result.Add(4);
                        result.Add(5);
                    }
                    else if (f == 4)
                    {
                        result.Add(3);
                        result.Add(5);
                    }
                    else
                    {
                        result.Add(3);
                        result.Add(4);
                    }
                    break;

                case "14":
                    result.Add(rnd1.Next(3, 6));
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(18, 21));
                    }
                    else
                    {
                        result.Add(rnd1.Next(24, 27));
                    }
                    result.Add(21);
                    result.Add(22);
                    result.Add(23);
                    break;

                case "13":
                    result.Add(rnd1.Next(3, 6));
                    if (randomnumber % 3 == 2)
                    {
                        result.Add(21);
                        result.Add(22);
                        result.Add(23);
                    }
                    else if (randomnumber % 3 == 1)
                    {
                        int a = rnd1.Next(21, 24);
                        if (a == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (a == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                        result.Add(rnd1.Next(18, 21));
                    }
                    else
                    {
                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                        result.Add(rnd1.Next(24, 27));
                    }
                    break;

                case "12":
                    result.Add(rnd1.Next(3, 6));
                    int g = rnd1.Next(21, 24);
                    if (g == 21)
                    {
                        result.Add(22);
                        result.Add(23);
                    }
                    else if (g == 22)
                    {
                        result.Add(21);
                        result.Add(23);
                    }
                    else
                    {
                        result.Add(21);
                        result.Add(22);
                    }
                    break;

                case "11":
                    result.Add(rnd1.Next(3, 6));
                    result.Add(rnd1.Next(21, 24));
                    break;

                case "10":
                    result.Add(rnd1.Next(3, 6));
                    break;

                case "05":
                    result.Add(21);
                    result.Add(22);
                    result.Add(23);
                    result.Add(rnd1.Next(18, 21));
                    result.Add(rnd1.Next(24, 27));
                    break;

                case "04":
                    result.Add(21);
                    result.Add(22);
                    result.Add(23);
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(18, 21));
                    }
                    else
                    {
                        result.Add(rnd1.Next(24, 27));
                    }
                    break;

                case "03":
                    if (randomnumber % 3 == 2)
                    {
                        result.Add(21);
                        result.Add(22);
                        result.Add(23);
                    }
                    else if (randomnumber % 3 == 1)
                    {
                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                        result.Add(rnd1.Next(18, 21));
                    }
                    else
                    {
                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                        result.Add(rnd1.Next(24, 27));
                    }
                    break;

                case "02":
                    int h = rnd1.Next(21, 24);
                    if (h == 21)
                    {
                        result.Add(22);
                        result.Add(23);
                    }
                    else if (h == 22)
                    {
                        result.Add(21);
                        result.Add(23);
                    }
                    else
                    {
                        result.Add(21);
                        result.Add(22);
                    }
                    break;

                case "01":
                    result.Add(rnd1.Next(21, 24));
                    break;
            }

            return result;
        }

        //Orta Yaşlı ağırlıklı avatar dağılımı son

        //Yaşlı ağırlıklı avatar dağılımı başlangıç
        public static List<Int32> oldavatar(string gender, int randomnumber)
        {
            List<Int32> result = new List<Int32>();
            Random rnd1 = new Random();

            switch (gender)
            {
                case "50":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(0, 3));
                        result.Add(rnd1.Next(3, 6));
                    }
                    else
                    {
                        int b = rnd1.Next(3, 6);
                        if (b == 3)
                        {
                            result.Add(4);
                            result.Add(5);
                        }
                        else if (b == 4)
                        {
                            result.Add(3);
                            result.Add(5);
                        }
                        else
                        {
                            result.Add(3);
                            result.Add(4);
                        }
                    }
                    result.Add(6);
                    result.Add(7);
                    result.Add(8);

                    break;

                case "41":
                    result.Add(rnd1.Next(3, 6));
                    result.Add(6);
                    result.Add(7);
                    result.Add(8);
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(21, 24));
                    }
                    else
                    {
                        result.Add(rnd1.Next(24, 27));
                    }
                    break;

                case "40":
                    result.Add(rnd1.Next(3, 6));
                    result.Add(6);
                    result.Add(7);
                    result.Add(8);
                    break;

                case "32":
                    if (randomnumber % 3 == 1)
                    {
                        result.Add(6);
                        result.Add(7);
                        result.Add(8);
                        int b = rnd1.Next(24, 27);
                        if (b == 24)
                        {
                            result.Add(25);
                            result.Add(26);
                        }
                        else if (b == 25)
                        {
                            result.Add(24);
                            result.Add(26);
                        }
                        else
                        {
                            result.Add(24);
                            result.Add(25);
                        }
                    }
                    else if (randomnumber % 3 == 2)
                    {
                        result.Add(6);
                        result.Add(7);
                        result.Add(8);
                        result.Add(rnd1.Next(21, 24));
                        result.Add(rnd1.Next(24, 27));
                    }
                    else
                    {
                        result.Add(rnd1.Next(3, 6));
                        int b = rnd1.Next(6, 9);
                        if (b == 6)
                        {
                            result.Add(7);
                            result.Add(8);
                        }
                        else if (b == 7)
                        {
                            result.Add(6);
                            result.Add(8);
                        }
                        else
                        {
                            result.Add(6);
                            result.Add(7);
                        }

                        b = rnd1.Next(24, 27);
                        if (b == 24)
                        {
                            result.Add(25);
                            result.Add(26);
                        }
                        else if (b == 25)
                        {
                            result.Add(24);
                            result.Add(26);
                        }
                        else
                        {
                            result.Add(24);
                            result.Add(25);
                        }
                    }
                    break;

                case "31":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(6);
                        result.Add(7);
                        result.Add(8);
                    }
                    else
                    {
                        result.Add(rnd1.Next(3, 6));
                        int b = rnd1.Next(6, 9);
                        if (b == 6)
                        {
                            result.Add(7);
                            result.Add(8);
                        }
                        else if (b == 7)
                        {
                            result.Add(6);
                            result.Add(8);
                        }
                        else
                        {
                            result.Add(6);
                            result.Add(7);
                        }
                    }
                    result.Add(rnd1.Next(24, 27));
                    break;

                case "30":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(6);
                        result.Add(7);
                        result.Add(8);
                    }
                    else
                    {
                        result.Add(rnd1.Next(3, 6));
                        int b = rnd1.Next(6, 9);
                        if (b == 6)
                        {
                            result.Add(7);
                            result.Add(8);
                        }
                        else if (b == 7)
                        {
                            result.Add(6);
                            result.Add(8);
                        }
                        else
                        {
                            result.Add(6);
                            result.Add(7);
                        }
                    }
                    break;

                case "23":
                    if (randomnumber % 3 == 1)
                    {
                        int b = rnd1.Next(6, 9);
                        if (b == 6)
                        {
                            result.Add(7);
                            result.Add(8);
                        }
                        else if (b == 7)
                        {
                            result.Add(6);
                            result.Add(8);
                        }
                        else
                        {
                            result.Add(6);
                            result.Add(7);
                        }
                        result.Add(24);
                        result.Add(25);
                        result.Add(26);
                    }
                    else if (randomnumber % 3 == 2)
                    {
                        result.Add(rnd1.Next(3, 6));
                        result.Add(rnd1.Next(6, 9));
                        result.Add(24);
                        result.Add(25);
                        result.Add(26);
                    }
                    else
                    {
                        int b = rnd1.Next(6, 9);
                        if (b == 6)
                        {
                            result.Add(7);
                            result.Add(8);
                        }
                        else if (b == 7)
                        {
                            result.Add(6);
                            result.Add(8);
                        }
                        else
                        {
                            result.Add(6);
                            result.Add(7);
                        }

                        result.Add(rnd1.Next(21, 24));
                        b = rnd1.Next(24, 27);
                        if (b == 24)
                        {
                            result.Add(25);
                            result.Add(26);
                        }
                        else if (b == 25)
                        {
                            result.Add(24);
                            result.Add(26);
                        }
                        else
                        {
                            result.Add(24);
                            result.Add(25);
                        }
                    }
                    break;

                case "22":
                    if (randomnumber % 3 == 1)
                    {
                        int b = rnd1.Next(6, 9);
                        if (b == 6)
                        {
                            result.Add(7);
                            result.Add(8);
                        }
                        else if (b == 7)
                        {
                            result.Add(6);
                            result.Add(8);
                        }
                        else
                        {
                            result.Add(6);
                            result.Add(7);
                        }
                        b = rnd1.Next(24, 27);
                        if (b == 24)
                        {
                            result.Add(25);
                            result.Add(26);
                        }
                        else if (b == 25)
                        {
                            result.Add(24);
                            result.Add(26);
                        }
                        else
                        {
                            result.Add(24);
                            result.Add(25);
                        }
                    }
                    else if (randomnumber % 3 == 2)
                    {
                        int b = rnd1.Next(6, 9);
                        if (b == 6)
                        {
                            result.Add(7);
                            result.Add(8);
                        }
                        else if (b == 7)
                        {
                            result.Add(6);
                            result.Add(8);
                        }
                        else
                        {
                            result.Add(6);
                            result.Add(7);
                        }
                        result.Add(rnd1.Next(21, 24));
                        result.Add(rnd1.Next(24, 27));
                    }
                    else
                    {
                        result.Add(rnd1.Next(3, 6));
                        result.Add(rnd1.Next(6, 9));
                        int b = rnd1.Next(24, 27);
                        if (b == 24)
                        {
                            result.Add(25);
                            result.Add(26);
                        }
                        else if (b == 25)
                        {
                            result.Add(24);
                            result.Add(26);
                        }
                        else
                        {
                            result.Add(24);
                            result.Add(25);
                        }
                    }
                    break;

                case "21":
                    if (randomnumber % 2 == 1)
                    {
                        int b = rnd1.Next(6, 9);
                        if (b == 6)
                        {
                            result.Add(7);
                            result.Add(8);
                        }
                        else if (b == 7)
                        {
                            result.Add(6);
                            result.Add(8);
                        }
                        else
                        {
                            result.Add(6);
                            result.Add(7);
                        }
                    }
                    else
                    {
                        result.Add(rnd1.Next(3, 6));
                        result.Add(rnd1.Next(6, 9));
                    }
                    result.Add(rnd1.Next(24, 27));
                    break;

                case "20":
                    int c = rnd1.Next(6, 9);
                    if (c == 6)
                    {
                        result.Add(7);
                        result.Add(8);
                    }
                    else if (c == 7)
                    {
                        result.Add(6);
                        result.Add(8);
                    }
                    else
                    {
                        result.Add(6);
                        result.Add(7);
                    }
                    break;

                case "14":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(3, 6));
                    }
                    else
                    {
                        result.Add(rnd1.Next(6, 9));
                    }
                    result.Add(rnd1.Next(21, 24));
                    result.Add(24);
                    result.Add(25);
                    result.Add(26);
                    break;

                case "13":
                    result.Add(rnd1.Next(6, 9));
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(24);
                        result.Add(25);
                        result.Add(26);
                    }
                    else
                    {
                        result.Add(rnd1.Next(21, 24));
                        int b = rnd1.Next(24, 27);
                        if (b == 24)
                        {
                            result.Add(25);
                            result.Add(26);
                        }
                        else if (b == 25)
                        {
                            result.Add(24);
                            result.Add(26);
                        }
                        else
                        {
                            result.Add(24);
                            result.Add(25);
                        }
                    }
                    break;

                case "12":
                    result.Add(rnd1.Next(6, 9));
                    if (randomnumber % 2 == 1)
                    {
                        int b = rnd1.Next(24, 27);
                        if (b == 24)
                        {
                            result.Add(25);
                            result.Add(26);
                        }
                        else if (b == 25)
                        {
                            result.Add(24);
                            result.Add(26);
                        }
                        else
                        {
                            result.Add(24);
                            result.Add(25);
                        }
                    }
                    else
                    {
                        result.Add(rnd1.Next(21, 24));
                        result.Add(rnd1.Next(24, 27));
                    }
                    break;

                case "11":
                    result.Add(rnd1.Next(6, 9));
                    result.Add(rnd1.Next(24, 27));
                    break;

                case "10":
                    result.Add(rnd1.Next(6, 9));
                    break;

                case "05":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(rnd1.Next(18, 21));
                        result.Add(rnd1.Next(21, 24));
                    }
                    else
                    {
                        int b = rnd1.Next(21, 24);
                        if (b == 21)
                        {
                            result.Add(22);
                            result.Add(23);
                        }
                        else if (b == 22)
                        {
                            result.Add(21);
                            result.Add(23);
                        }
                        else
                        {
                            result.Add(21);
                            result.Add(22);
                        }
                    }
                    result.Add(24);
                    result.Add(25);
                    result.Add(26);
                    break;

                case "04":
                    result.Add(rnd1.Next(21, 24));
                    result.Add(24);
                    result.Add(25);
                    result.Add(26);

                    break;

                case "03":
                    if (randomnumber % 2 == 1)
                    {
                        result.Add(24);
                        result.Add(25);
                        result.Add(26);
                    }
                    else
                    {
                        result.Add(rnd1.Next(21, 24));
                        int b = rnd1.Next(24, 27);
                        if (b == 24)
                        {
                            result.Add(25);
                            result.Add(26);
                        }
                        else if (b == 25)
                        {
                            result.Add(24);
                            result.Add(26);
                        }
                        else
                        {
                            result.Add(24);
                            result.Add(25);
                        }
                    }
                    break;

                case "02":
                    int d = rnd1.Next(24, 27);
                    if (d == 24)
                    {
                        result.Add(25);
                        result.Add(26);
                    }
                    else if (d == 25)
                    {
                        result.Add(24);
                        result.Add(26);
                    }
                    else
                    {
                        result.Add(24);
                        result.Add(25);
                    }
                    break;

                case "01":
                    result.Add(rnd1.Next(24, 27));
                    break;
            }
            return result;
        }

        //Yaşlı ağırlıklı avatar dağılımı son

        //Sözlü iletişim için yorumu bulma fonksiyonu başlangıç
        public static string questionmessage(string quest)
        {
            string result = "";

            switch (quest)
            {
                case "000":
                    result = "Avatar Sorusu: Merhaba, hoş geldin! Oldukça zorlu bir başvuru süreci sonrası güçlü adaylar arasından seçilerek bu mülakata gelmeyi başardın. Öncelikle bu zamana kadar göstermiş olduğun azmini ve çabanı tebrik ederim. Seni daha yakından tanımak istiyoruz.";
                    break;

                case "001":
                    result = "Avatar Sorusu: Merhaba, hoş geldin! Birçok iddialı aday arasında seçilerek bu mülakata gelmeye hak kazandın. Başvuru belgelerini incelediğimizde eğitim hayatın boyunca çok başarılı ve azimli bir öğrenci olduğunu gördük. Bölümün hocaları olarak seni daha yakından tanımak istiyoruz.";
                    break;

                case "002":
                    result = "Avatar Sorusu: Merhaba, hoş geldin! Oldukça zorlu bir hazırlık süreci sonrası yüksek lisans mülakatına çağırılan adaylardan biri olmayı başardın. Her şeyden önce bu süreçteki sabrını ve motivasyonunu takdir ederim. Lisans eğitimin boyunca her zaman dikkatimizi çeken öğrencilerden biri olmuştun. Kişisel olarak seni yakından tanımak istiyoruz.";
                    break;

                case "003":
                    result = "Avatar Sorusu: Bize kendinden biraz bahseder misin? Kendini güçlü bulduğun yönlerinden, gelişime açık olduğunu düşündüğün özelliklerinden bahsedip seni neden seçmeliyiz anlatabilir misin?";
                    break;

                case "004":
                    result = "Avatar Sorusu: Bize ilgilendiğin araştırma alanlarını, bu alanı seçmende rol oynayan faktörleri ve en çok gurur duyduğun akademik başarını anlatır mısın?";
                    break;

                case "005":
                    result = "Avatar Sorusu: Bize yaptığın akademik çalışma eleştirildiğinde ne hissettiğini, nasıl davrandığını ve idealindeki akademik çalışma ortamını anlatabilir misin? Sende gerginlik yaratan kişilerle çalışırken nasıl bir baş etme yöntemi uygularsın ?";
                    break;

                case "006":
                    result = "Avatar Sorusu: Merhaba, hoş geldiniz! Öncelikle şirketimize göstermiş olduğunuz ilgi için çok teşekkür ederiz. Özgeçmişinizi inceledik. Eğitim ve kariyer anlamında çok başarılı ve azimli bir tablo çiziyorsunuz. Sizi daha yakından tanımak istedik.";
                    break;

                case "007":
                    result = "Avatar Sorusu: Merhaba, hoş geldiniz! Öncelikle şirketimize göstermiş olduğunuz ilgi için çok teşekkür ederiz. Oldukça zorlu bir başvuru süreci sonrası güçlü adaylar arasından seçilerek bu mülakata gelmeyi başardınız. Sizi daha yakından tanımak için birkaç soru sorarak başlamak istiyoruz.";
                    break;

                case "008":
                    result = "Avatar Sorusu: Merhaba hoş geldiniz! Öncelikle şirketimize göstermiş olduğunuz ilgi için çok teşekkür ederiz. Birçok iddialı aday arasından seçilerek bu mülakata gelmeye hak kazandınız. Şirket olarak sizi daha yakından tanımak istiyoruz.";
                    break;

                case "009":
                    result = "Avatar Sorusu: Bize kendinizden biraz bahseder misiniz? Kendinizi güçlü bulduğunuz yönlerinizden, gelişime açık olduğunu düşündüğünüz özelliklerinizden bahsedip sizi neden işe almalıyız anlatır mısınız?";
                    break;

                case "010":
                    result = "Avatar Sorusu: Bize ilgilendiğiniz çalışma alanlarından, bu pozisyona başvurma nedenlerinizden ve işe kabul edilirseniz ekibimize sağlayabileceğiniz katkılardan bahseder misiniz?";
                    break;

                case "011":
                    result = "Avatar Sorusu: Bize bu pozisyonun genel kariyer hedeflerinizle ne kadar örtüştüğünü, önümüzdeki yıl kendinizi kişisel anlamda geliştirmek için neler yapmayı planladığınızı, ve önümüzdeki beş yıl içinde kendinizi nerede gördüğünüzü anlatır mısınız?";
                    break;

                case "012":
                    result = "Avatar Sorusu: Merhaba arkadaşlar. Bölümümüzde yapmayı düşündüğümüz değişiklik için sizlerin fikrini almak amacıyla toplantı yapmak istedim.";
                    break;

                case "013":
                    result = "Avatar Sorusu: Sence bölümümüzde, teknolojik anlamda ne gibi yenilikler uygulanabilir?";
                    break;

                case "014":
                    result = "Avatar Sorusu: Bize ayrılan bütçeyi asistan sayısının artırmak veya laboratuvar kurulumu için kullanmamız gerekiyor. Sence hangisini seçmeliyiz?";
                    break;

                case "015":
                    result = "Avatar Sorusu: Bölüm programına ne tür seçmeli dersler eklenebilir?";
                    break;

                case "016":
                    result = "Avatar Sorusu: Merhaba arkadaşlar. Bir konuda sizlerin fikrini almak için toplantı yapmak istedim.";
                    break;

                case "017":
                    result = "Avatar Sorusu: Bazı çalışanları işten çıkarmamız gerekiyor. İşten çıkacak kişileri hangi kriterleri baz alarak belirleyelim?";
                    break;

                case "018":
                    result = "Avatar Sorusu: Sence, performans ödülünü hangi kriterlere göre verelim?";
                    break;

                case "019":
                    result = "Avatar Sorusu: Proje teslimimiz 2 gün sonra ve 3 günlük işimiz var. İşi yetiştirmek için nasıl bir yol izlemeliyiz?";
                    break;

                case "020":
                    result = "Avatar Sorusu: Merhaba, hepiniz hoş geldiniz! Sözü sunum yapacak arkadaşımıza bırakmak istiyorum.";
                    break;

                case "021":
                    result = "Avatar Sorusu: Bize akademik ilgi alanlarını ve bugüne kadar bunlarla ilgili yaptığın çalışmaları anlatır mısın?";
                    break;

                case "022":
                    result = "Avatar Sorusu: Bize seni en çok etkileyen dersleri ve nedenlerini anlatır mısın?";
                    break;

                case "023":
                    result = "Avatar Sorusu: Bize üniversitede okuduğun alanı çeşitli yönleri ile anlatır mısın?";
                    break;

                case "024":
                    result = "Avatar Sorusu: Sizce, derslere devamlılık zorunluluğu gerekli midir, değil midir? Bize bu konudaki görüşlerinizi anlatır mısınız?";
                    break;

                case "025":
                    result = "Avatar Sorusu: Sizce, sosyal medya sosyal ilişkilerimizi olumsuz yönde etkiliyor mu? Bu konudaki görüşlerinizi anlatır mısınız?";
                    break;

                case "026":
                    result = "Avatar Sorusu: Sizce, bilgisayar, öğretmenin yerini alabilir mi?. Bu konudaki görüşlerinizi anlatır mısınız?";
                    break;

                case "027":
                    result = "Avatar Sorusu: Merhaba, hoşgeldiniz. Nasıl yardımcı olabilirim? Bu malı neden iade etmek istiyorsunuz?";
                    break;

                case "028":
                    result = "Avatar Sorusu: Merhaba, hoşgeldiniz. Bana aradığınız ürünü tarif ederseniz size yardımcı olabilirim?";
                    break;

                case "029":
                    result = "Avatar Sorusu: Merhaba, hoşgeldiniz. Bu mal ile ilgili şikayetiniz nedir, anlatır mısınız?";
                    break;

                case "030":
                    result = "Avatar Sorusu: Merhaba, ben metroya ilk defa biniyorum. Siz ne sıklıkta biniyorsunuz, genellikle rahat mı? Nasıl değerlendiriyorsunuz?";
                    break;

                case "031":
                    result = "Avatar Sorusu: Merhaba, ben bu hattı ilk defa kullanıyorum. Bana Selanik Caddesine nasıl gidebileceğimi tarif edebilir misiniz?";
                    break;

                case "032":
                    result = "Avatar Sorusu: Merhaba, galiba öğrencisiniz, nerede okuyorsunuz? Okulunuzdan memnun musunuz?";
                    break;

                case "033":
                    result = "Avatar Sorusu: Epeydir görüşemedik, neler yapıyorsun son zamanlarda anlatsana? ";
                    break;

                case "034":
                    result = "Avatar Sorusu: Epeydir görüşemedik, ailen nasıl, anlatsana? ";
                    break;

                case "035":
                    result = "Avatar Sorusu: En son okuduğun ve bana tavsiye edebileceğin bir kitap ya da film var mı?";
                    break;

                case "036":
                    result = "Avatar Geri Bildirimi: Kendinizi çok iyi anlattınız.";
                    break;

                case "037":
                    result = "Avatar Geri Bildirimi: Sizinle tanışmak büyük bir memnuniyetti.";
                    break;

                case "038":
                    result = "Avatar Geri Bildirimi: Başarılarınızın  devamı  diliyorum.";
                    break;

                case "039":
                    result = "Avatar Geri Bildirimi: Bu fikir çok hoşuma gitti.";
                    break;

                case "040":
                    result = "Avatar Geri Bildirimi: Çok güzel bir noktaya değindiniz.";
                    break;

                case "041":
                    result = "Avatar Geri Bildirimi: Gayet uygun.";
                    break;

                case "042":
                    result = "Avatar Geri Bildirimi: Çok güzel bir sunumdu.";
                    break;

                case "043":
                    result = "Avatar Geri Bildirimi: Çok ilgi çekiciydi.";
                    break;

                case "044":
                    result = "Avatar Geri Bildirimi: Hiç sıkılmadan dinledim, mükemmeldi.";
                    break;

                case "045":
                    result = "Avatar Geri Bildirimi: Sizi çok iyi anlıyorum.";
                    break;

                case "046":
                    result = "Avatar Geri Bildirimi: Aslında haklısınız.";
                    break;

                case "047":
                    result = "Avatar Geri Bildirimi: Tamam, işleminizi alıyoruz, birkaç hafta içinde para iadesi yapacağız.";
                    break;

                case "048":
                    result = "Avatar Geri Bildirimi: Başarılar dilerim.";
                    break;

                case "049":
                    result = "Avatar Geri Bildirimi: İyi günler dilerim.";
                    break;

                case "050":
                    result = "Avatar Geri Bildirimi: Hoşçakalın.";
                    break;

                case "051":
                    result = "Avatar Geri Bildirimi: Çok güzel.";
                    break;

                case "052":
                    result = "Avatar Geri Bildirimi: Seni dinlemeyi özlemişim.";
                    break;

                case "053":
                    result = "Avatar Geri Bildirimi: İyi ki bir araya geldik.";
                    break;

                case "054":
                    result = "Avatar Geri Bildirimi: Kendinizi biraz daha net anlatmalısınız.";
                    break;

                case "055":
                    result = "Avatar Geri Bildirimi: Biraz daha tecrübeye ihtiyacınız var sanki.";
                    break;

                case "056":
                    result = "Avatar Geri Bildirimi: Bu pozisyona çok uygun olduğunuzu düşünmüyorum.";
                    break;

                case "057":
                    result = "Avatar Geri Bildirimi: Bunun iyi bir fikir olduğunu sanmıyorum.";
                    break;

                case "058":
                    result = "Avatar Geri Bildirimi: Fikrinizi iyi bir şekilde desteklediğinizi düşünmüyorum.";
                    break;

                case "059":
                    result = "Avatar Geri Bildirimi: Bu konuda başka bir fikriniz var mı?";
                    break;

                case "060":
                    result = "Avatar Geri Bildirimi: İyi bir sunum değildi, üzgünüm.";
                    break;

                case "061":
                    result = "Avatar Geri Bildirimi: Sunumunuz biraz kafamı karıştırdı açıkçası.";
                    break;

                case "062":
                    result = "Avatar Geri Bildirimi: Bir sonraki sunum için prova yapabilirsiniz.";
                    break;

                case "063":
                    result = "Avatar Geri Bildirimi: Fakat siz bu ürünü kullanmışsınız.";
                    break;

                case "064":
                    result = "Avatar Geri Bildirimi: Malesef bu tür şikayetlerde bir şey yapamıyoruz.";
                    break;

                case "065":
                    result = "Avatar Geri Bildirimi: Sizi anlıyorum, ama bu şartlarda malesef ürünü alamıyoruz.";
                    break;

                case "066":
                    result = "Avatar Geri Bildirimi: Hep böyle sessiz biri misiniz?";
                    break;

                case "067":
                    result = "Avatar Geri Bildirimi: Galiba, konuşmayı pek sevmiyorsunuz?";
                    break;

                case "068":
                    result = "Avatar Geri Bildirimi: Galiba sizi rahatsız ettim, özür dilerim.";
                    break;

                case "069":
                    result = "Avatar Geri Bildirimi: Bir yıldır görüşmüyoruz, hiç mi bir şey yapmadın?";
                    break;

                case "070":
                    result = "Avatar Geri Bildirimi: Seninle de hiçbir şey konuşulmuyor.";
                    break;

                case "071":
                    result = "Avatar Geri Bildirimi: Kendinle ilgili konuşmaktan hoşlanmıyorsun.";
                    break;

                case "072":
                    result = "Avatar Konuşma Bölme: Sesinizi çok net duyamıyorum. Daha yüksek sesle konuşur musunuz?";
                    break;

                case "073":
                    result = "Avatar Konuşma Bölme: Bir dakika lütfen, bir süredir ne dediğinizi anlayamıyorum. Tane tane konuşur musunuz?";
                    break;

                case "074":
                    result = "Avatar Konuşma Bölme: Pardon sanırım çok heyecanlısınız. Biraz daha sakin anlatır mısınız?";
                    break;

                case "075":
                    result = "Avatar Konuşma Bölme: Çok özür dileyerek böleceğim, biraz daha net konuşur musunuz, anlam bütünlüğü kurmakta güçlük çekiyorum.";
                    break;

                case "076":
                    result = "Avatar Konuşma Bölme: Pardon ama baya karışık anlatıyorsunuz. Söyleyeceklerinizi daha kısa ve öz ifade edebilir misiniz?";
                    break;

                case "077":
                    result = "Avatar Konuşma Bölme: Ne demek istediğinizi tam anlamadım. Konuyu biraz daha açar mısınız?";
                    break;

                case "078":
                    result = "Avatar Konuşma Bölme: Tüm anlatacaklarınız bu kadar mıydı? Biraz daha detaylı anlatabilir misiniz?";
                    break;

                case "079":
                    result = "Avatar Onayı: Hı hı.";
                    break;

                case "080":
                    result = "Avatar Onayı: Evet.";
                    break;

                case "081":
                    result = "Avatar Onayı: Doğru.";
                    break;

                case "082":
                    result = "Avatar Reddi: I-ıh.";
                    break;

                case "083":
                    result = "Avatar Reddi: Hayır.";
                    break;

                case "084":
                    result = "Avatar Reddi: Katılmıyorum.";
                    break;

                case "085":
                    result = "085";
                    break;

                case "086":
                    result = "086";
                    break;

                case "087":
                    result = "087";
                    break;

                case "088":
                    result = "088";
                    break;

                case "089":
                    result = "089";
                    break;

                case "090":
                    result = "090";
                    break;

                case "091":
                    result = "091";
                    break;

                case "900":
                    result = "Dikkat Dağıtıcı Ses: Fısıltı";
                    break;

                case "901":
                    result = "Dikkat Dağıtıcı Ses: Öksürme";
                    break;

                case "902":
                    result = "Dikkat Dağıtıcı Ses: Telefon çalma";
                    break;

                case "903":
                    result = "Dikkat Dağıtıcı Ses: Telefon mesajı";
                    break;

                case "904":
                    result = "Dikkat Dağıtıcı Ses: Yiyecek yeme sesi";
                    break;

                case "905":
                    result = "Dikkat Dağıtıcı Ses: İçecek içme sesi";
                    break;

                case "906":
                    result = "Dikkat Dağıtıcı Ses: Ortamdan avatar çıkması";
                    break;

                case "907":
                    result = "Dikkat Dağıtıcı Ses: Ortama avatar girmesi";
                    break;
            }

            return result;
        }

        //Sözlü iletişim için yorumu bulma fonksiyonu son

        //Seans bitince kalan seans sayısını güncelleyen fonksiyon
        public static int session_counter_decrease(int docid)
        {
            MySqlConnection conn = Conn();
            MySqlCommand query = conn.CreateCommand();

            int k = 0;
            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "SELECT remaining_session FROM vrsocial.doctortable WHERE id=" + docid + "";
            MySqlDataReader fetch_query = query.ExecuteReader();
            while (fetch_query.HasRows && fetch_query.Read())
            {
                k = fetch_query["remaining_session"].GetHashCode();
            }
            conn.Close();

            k = k - 1;

            try
            {
                conn.Open();
            }
            catch (MySqlException ex)
            {
                Debug.WriteLine(ex.Message);
            }
            query.CommandText = "UPDATE vrsocial.doctortable SET remaining_session='" + k + "' WHERE id=" + docid + ";";
            query.ExecuteReader();
            conn.Close();
            return k;
        }

        //Seans bitince kalan seans sayısını güncelleyen fonksiyon

        //KEY ÜRETME FONKSİYONU başlangıç
        public static string GenerateCoupon(int length, Random random)
        {
            string characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            StringBuilder result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(characters[random.Next(characters.Length)]);
            }
            return result.ToString();
        }

        //KEY ÜRETME FONKSİYONU son
    }
}