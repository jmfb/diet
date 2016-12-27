using System.Collections.Generic;

namespace DietApi.Models
{
	public class PlanModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public NutritionModel Target { get; set; }
		public IEnumerable<MealModel> Meals { get; set; }
	}
}
