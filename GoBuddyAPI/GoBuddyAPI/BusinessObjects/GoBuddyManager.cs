using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Xml.Linq;

namespace GoBuddyAPI.BusinessObjects
{
    public class GoBuddyManager
    {
        public static bool SaveUserProfileData(UserProfile user)
        {
            bool isSuccess = false;
            try
            {
                XDocument doc = XDocument.Load("C:\\GoBuddyDB\\UserData.xml");
                XElement  root = doc.Element("User");
                root.Add(
                         new XElement("UserID", user.UserID),
                         new XElement("FirstName", user.UserFirstName),
                         new XElement("LastName", user.UserLastName),
                         new XElement("Location", user.Location),
                         new XElement("Interest", user.Interest),
                         new XElement("Email", user.Email),
                         new XElement("Age", user.Age),
                         new XElement("Gender", user.Gender));
                
                doc.Save("C:\\GoBuddyDB\\UserData.xml");
                isSuccess = true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return isSuccess;
        }
    }
}
