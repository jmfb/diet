namespace DietApi.Models
{
	public class PlanSummaryModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public NutritionModel Target { get; set; }
		public NutritionModel Actual { get; set; }
	}
}
