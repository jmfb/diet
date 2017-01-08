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
		public virtual int UpdatePlan([FromBody]PlanModel plan)
		{
			return DataBridge.UpdatePlan(UserId, plan);
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

		[HttpGet]
		public virtual FoodOrRecipeModel GetFood(int id)
		{
			return DataBridge.GetFood(UserId, id);
		}

		[HttpPost]
		public virtual int UpdateFood([FromBody]FoodModel food)
		{
			return DataBridge.UpdateFood(UserId, food);
		}

		[HttpPost]
		public virtual int UpdateRecipe([FromBody]RecipeModel recipe)
		{
			return DataBridge.UpdateRecipe(UserId, recipe);
		}

		[HttpDelete]
		public virtual void DeleteFood(int id)
		{
			DataBridge.DeleteFood(UserId, id);
		}
	}
}
