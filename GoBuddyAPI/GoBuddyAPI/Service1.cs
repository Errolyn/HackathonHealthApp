using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

using GoBuddyAPI.BusinessObjects;

namespace GoBuddyAPI
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in both code and config file together.
    public class Service1 : IService1
    {
            public bool SaveUserProfile(UserProfile user)
        {
            try
            {
                return GoBuddyManager.SaveUserProfileData(user);
            }

            catch (NotImplementedException ex)
            {
                throw new FaultException(ex.Message + ex.StackTrace);

            }
        }
    }
}
