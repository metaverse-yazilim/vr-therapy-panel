using MySql.Data.MySqlClient;
using System;

namespace VirtualTherapySystemPanelDB.Managers
{
    public class BaseManager
    {
        public static MySqlConnection Conn()
        {
            string conn_string = "server= vrsocial1.citxnibmvcmg.eu-central-1.rds.amazonaws.com; port=3306; database=vrsocial; username=metaverse;password=mtvrs18yzlm;charset=utf8; ";
            MySqlConnection conn = new MySqlConnection(conn_string);

            return conn;
        }
    }
}