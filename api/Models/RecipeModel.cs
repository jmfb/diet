using System.Collections.Generic;

namespace DietApi.Models
{
	public class RecipeModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public double UnitSize { get; set; }
		public string UnitMeasure { get; set; }
		public string SiteUrl { get; set; }
		public IEnumerable<IngredientModel> Ingredients { get; set; } 
	}
}
