using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using DietApi.Models;

namespace DietApi.Controllers
{
	public class MealsController : AuthorizedController
	{
		[HttpGet]
		public virtual IEnumerable<PlanSummaryModel> GetPlans()
		{
			return DataBridge.GetPlans(UserId).ToList();
		}
	}
}
