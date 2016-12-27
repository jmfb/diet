using System;
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

		[HttpPost]
		public virtual void UpdatePlan([FromBody]PlanModel plan)
		{
			DataBridge.UpdatePlan(UserId, plan);
		}

		[HttpGet]
		public virtual IEnumerable<FoodModel> GetFoods()
		{
			return DataBridge.GetFoods(UserId).ToList();
		}
	}
}
