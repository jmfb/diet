using System.Web.Http;

namespace DietApi.Controllers
{
	public class WeightController : AuthorizedController
	{
		[HttpPost]
		public virtual void UpdateWeight(string when, double weightInPounds)
		{
			DataBridge.UpdateWeight(UserId, when, weightInPounds);
		}
	}
}
