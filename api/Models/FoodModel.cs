namespace DietApi.Models
{
	public class FoodModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public double UnitSize { get; set; }
		public string UnitMeasure { get; set; }
		public string SiteUrl { get; set; }
		public NutritionModel Nutrition { get; set; }
	}
}
