using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using DietApi.Models;

namespace DietApi.Controllers
{
	public class ProfilesController : AuthorizedController
	{
		[HttpGet]
		public virtual ProfileModel GetProfile()
		{
			return DataBridge.GetProfile(UserId);
		}

		[HttpPost]
		public virtual void UpdateProfile([FromBody]ProfileModel profile)
		{
			DataBridge.UpdateProfile(UserId, profile);
		}
	}
}
