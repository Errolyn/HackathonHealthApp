using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ServiceModel;
using System.Runtime.Serialization;

namespace GoBuddyAPI
{
    [DataContract]
    public class UserProfile
    {
        [DataMember(Order = 0)]
        public string UserID { get; set; }

        [DataMember(Order = 1)]
        public string UserFirstName { get; set; }

        [DataMember(Order = 2)]
        public string UserLastName { get; set; }

        [DataMember(Order = 3)]
        public string Location { get; set; }

        [DataMember(Order = 4)]
        public string Interest { get; set; }

        [DataMember(Order = 5)]
        public string Email { get; set; }

        [DataMember(Order = 6)]
        public string Age { get; set; }

        [DataMember(Order = 7)]
        public string Gender { get; set; }

    }
}
