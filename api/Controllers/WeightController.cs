using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using DietApi.Models;

namespace DietApi.Controllers
{
	public class WeightController : AuthorizedController
	{
		[HttpPost]
		public virtual void UpdateWeight(string when, double weightInPounds)
		{
			DataBridge.UpdateWeight(UserId, when, weightInPounds);
		}

		[HttpDelete]
		public virtual void DeleteWeight(string when)
		{
			DataBridge.DeleteWeight(UserId, when);
		}

		[HttpGet]
		public virtual IEnumerable<WeightModel> GetWeights(string startDate, string endDateExclusive)
		{
			return DataBridge.GetWeights(UserId, startDate, endDateExclusive).ToList();
		}

		[HttpGet]
		public virtual IEnumerable<WeightModel> GetRecentWeights(int skip, int take)
		{
			return DataBridge.GetRecentWeights(UserId, skip, take);
		}
	}
}
