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

		[HttpGet]
		public virtual PlanModel GetPlan(int id)
		{
			return DataBridge.GetPlan(UserId, id);
		}

		[HttpPost]
		public virtual void UpdatePlan([FromBody]PlanModel plan)
		{
			DataBridge.UpdatePlan(UserId, plan);
		}

		[HttpDelete]
		public virtual void DeletePlan(int id)
		{
			DataBridge.DeletePlan(UserId, id);
		}

		[HttpGet]
		public virtual IEnumerable<FoodModel> GetFoods()
		{
			return DataBridge.GetFoods(UserId).ToList();
		}

		[HttpPost]
		public virtual void UpdateFood([FromBody]FoodModel food)
		{
			DataBridge.UpdateFood(UserId, food);
		}

		[HttpDelete]
		public virtual void DeleteFood(int id)
		{
			DataBridge.DeleteFood(UserId, id);
		}
	}
}
