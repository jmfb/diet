﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using DietApi.Models;

namespace DietApi
{
	public static class DataBridge
	{
		private static string ConnectionString =>
			WebConfigurationManager.ConnectionStrings["Diet"].ConnectionString;

		private static SqlConnection CreateConnection()
		{
			var connection = new SqlConnection(ConnectionString);
			connection.Open();
			return connection;
		}

		private static SqlCommand CreateCommand(this SqlConnection connection, string storedProcedureName) =>
			new SqlCommand($"Diet.Diet.{storedProcedureName}", connection)
			{
				CommandType = CommandType.StoredProcedure
			};

		public static int UpdateAccount(string account, string name)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Account_M"))
			{
				command.Parameters.AddWithValue("@account", account);
				command.Parameters.AddWithValue("@name", name);
				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");
					return (int)reader["Id"];
				}
			}
		}

		public static ProfileModel GetProfile(int userId)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Profile_S"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");
					var genderId = reader["GenderId"];
					var bodyTypeId = reader["BodyTypeId"];
					var heightInInches = reader["HeightInInches"];
					var birthYear = reader["BirthYear"];
					var targetWeightInPounds = reader["TargetWeightInPounds"];
					return new ProfileModel
					{
						GenderId = genderId is DBNull ? (int?)null : (int)genderId,
						BodyTypeId = bodyTypeId is DBNull ? (int?)null : (int)bodyTypeId,
						HeightInInches = heightInInches is DBNull ? (int?)null : (int)heightInInches,
						BirthYear = birthYear is DBNull ? (int?)null : (int)birthYear,
						TargetWeightInPounds = targetWeightInPounds is DBNull ? (int?)null : (int)targetWeightInPounds
					};
				}
			}
		}

		public static void UpdateProfile(int userId, ProfileModel profile)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Profile_U"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@genderId", profile.GenderId ?? (object)DBNull.Value);
				command.Parameters.AddWithValue("@bodyTypeId", profile.BodyTypeId ?? (object)DBNull.Value);
				command.Parameters.AddWithValue("@heightInInches", profile.HeightInInches ?? (object)DBNull.Value);
				command.Parameters.AddWithValue("@birthYear", profile.BirthYear ?? (object)DBNull.Value);
				command.Parameters.AddWithValue("@targetWeightInPounds", profile.TargetWeightInPounds ?? (object)DBNull.Value);
				command.ExecuteNonQuery();
			}
		}

		public static void UpdateWeight(int userId, string when, double weightInPounds)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Weight_M"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@when", when);
				command.Parameters.AddWithValue("@weightInPounds", weightInPounds);
				command.ExecuteNonQuery();
			}
		}

		public static void DeleteWeight(int userId, string when)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Weight_D"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@when", when);
				command.ExecuteNonQuery();
			}
		}

		public static IEnumerable<WeightModel> GetWeights(int userId, string startDate, string endDateExclusive)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Weights_S"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@startDate", startDate);
				command.Parameters.AddWithValue("@endDateExclusive", endDateExclusive);
				using (var reader = command.ExecuteReader())
				{
					var whenOrdinal = reader.GetOrdinal("When");
					var weightInPoundsOrdinal = reader.GetOrdinal("WeightInPounds");
					while (reader.Read())
						yield return new WeightModel
						{
							When = $"{(DateTime)reader[whenOrdinal]:yyyy-MM-dd}",
							WeightInPounds = (double)reader[weightInPoundsOrdinal]
						};
				}
			}
		}

		public static IEnumerable<WeightModel> GetRecentWeights(int userId, int skip, int take)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_RecentWeights_S"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@skip", skip);
				command.Parameters.AddWithValue("@take", take);
				using (var reader = command.ExecuteReader())
				{
					var whenOrdinal = reader.GetOrdinal("When");
					var weightInPoundsOrdinal = reader.GetOrdinal("WeightInPounds");
					while (reader.Read())
						yield return new WeightModel
						{
							When = $"{(DateTime)reader[whenOrdinal]:yyyy-MM-dd}",
							WeightInPounds = (double)reader[weightInPoundsOrdinal]
						};
				}
			}
		}

		public static IEnumerable<PlanSummaryModel> GetPlans(int userId)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Plans_S"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				using (var reader = command.ExecuteReader())
				{
					var idOrdinal = reader.GetOrdinal("Id");
					var nameOrdinal = reader.GetOrdinal("Name");
					var targetProteinOrdinal = reader.GetOrdinal("TargetProtein");
					var targetCarbohydratesOrdinal = reader.GetOrdinal("TargetCarbohydrates");
					var targetFatOrdinal = reader.GetOrdinal("TargetFat");
					var actualProteinOrdinal = reader.GetOrdinal("ActualProtein");
					var actualCarbohydratesOrdinal = reader.GetOrdinal("ActualCarbohydrates");
					var actualFatOrdinal = reader.GetOrdinal("ActualFat");
					while (reader.Read())
						yield return new PlanSummaryModel
						{
							Id = (int)reader[idOrdinal],
							Name = (string)reader[nameOrdinal],
							Target = new NutritionModel
							{
								Protein = (double)reader[targetProteinOrdinal],
								Carbohydrates = (double)reader[targetCarbohydratesOrdinal],
								Fat = (double)reader[targetFatOrdinal]
							},
							Actual = new NutritionModel
							{
								Protein = (double)reader[actualProteinOrdinal],
								Carbohydrates = (double)reader[actualCarbohydratesOrdinal],
								Fat = (double)reader[actualFatOrdinal]
							}
						};
				}
			}
		}

		public static PlanModel GetPlan(int userId, int id)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Plan_S"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@id", id);
				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");

					var meals = new List<MealModel>();
					var plan = new PlanModel
					{
						Id = (int)reader["Id"],
						Name = (string)reader["Name"],
						Target = new NutritionModel
						{
							Protein = (double)reader["TargetProtein"],
							Carbohydrates = (double)reader["TargetCarbohydrates"],
							Fat = (double)reader["TargetFat"]
						},
						Meals = meals
					};

					if (!reader.NextResult())
						throw new InvalidOperationException("Missing meals result.");

					var idOrdinal = reader.GetOrdinal("Id");
					var quantityOrdinal = reader.GetOrdinal("Quantity");
					while (reader.Read())
						meals.Add(new MealModel
						{
							Id = (int)reader[idOrdinal],
							Quantity = (double)reader[quantityOrdinal]
						});

					return plan;
				}
			}
		}

		public static int UpdatePlan(int userId, PlanModel plan)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Plan_M"))
			using (var meals = new DataTable())
			{
				meals.Columns.Add("Id", typeof(int));
				meals.Columns.Add("Quantity", typeof(double));
				foreach (var meal in plan.Meals)
					meals.Rows.Add(meal.Id, meal.Quantity);

				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@id", plan.Id);
				command.Parameters.AddWithValue("@name", plan.Name);
				command.Parameters.AddWithValue("@targetProtein", plan.Target.Protein);
				command.Parameters.AddWithValue("@targetFat", plan.Target.Fat);
				command.Parameters.AddWithValue("@targetCarbohydrates", plan.Target.Carbohydrates);
				command.Parameters.Add(new SqlParameter("@meals", SqlDbType.Structured)
				{
					TypeName = "Diet.udt_Meals",
					Value = meals
				});

				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");
					return (int)reader["Id"];
				}
			}
		}

		public static void DeletePlan(int userId, int id)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Plan_D"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@id", id);
				command.ExecuteNonQuery();
			}
		}

		public static IEnumerable<FoodModel> GetFoods(int userId)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Foods_S"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				using (var reader = command.ExecuteReader())
				{
					var idOrdinal = reader.GetOrdinal("Id");
					var nameOrdinal = reader.GetOrdinal("Name");
					var unitSizeOrdinal = reader.GetOrdinal("UnitSize");
					var unitMeasureOrdinal = reader.GetOrdinal("UnitMeasure");
					var siteUrlOrdinal = reader.GetOrdinal("SiteUrl");
					var proteinOrdinal = reader.GetOrdinal("Protein");
					var carbohydratesOrdinal = reader.GetOrdinal("Carbohydrates");
					var fatOrdinal = reader.GetOrdinal("Fat");
					while (reader.Read())
						yield return new FoodModel
						{
							Id = (int)reader[idOrdinal],
							Name = (string)reader[nameOrdinal],
							UnitSize = (double)reader[unitSizeOrdinal],
							UnitMeasure = (string)reader[unitMeasureOrdinal],
							SiteUrl = (string)reader[siteUrlOrdinal],
							Nutrition = new NutritionModel
							{
								Protein = (double)reader[proteinOrdinal],
								Carbohydrates = (double)reader[carbohydratesOrdinal],
								Fat = (double)reader[fatOrdinal]
							}
						};
				}
			}
		}

		public static FoodOrRecipeModel GetFood(int userId, int id)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Food_S"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@id", id);
				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");

					var ingredients = new List<IngredientModel>();
					var recipes = new List<int>();
					var plans = new List<PlanModel>();
					var food = new FoodOrRecipeModel
					{
						Id = (int)reader["Id"],
						Name = (string)reader["Name"],
						UnitSize = (double)reader["UnitSize"],
						UnitMeasure = (string)reader["UnitMeasure"],
						SiteUrl = (string)reader["SiteUrl"],
						Nutrition = null,
						Ingredients = ingredients,
						Recipes = recipes,
						Plans = plans
					};

					if (!reader.NextResult())
						throw new InvalidOperationException("Missing nutrition result.");

					if (reader.Read())
						food.Nutrition = new NutritionModel
						{
							Protein = (double)reader["Protein"],
							Fat = (double)reader["Fat"],
							Carbohydrates = (double)reader["Carbohydrates"]
						};

					if (!reader.NextResult())
						throw new InvalidOperationException("Missing ingredient result.");

					var idOrdinal = reader.GetOrdinal("Id");
					var quantityOrdinal = reader.GetOrdinal("Quantity");
					while (reader.Read())
						ingredients.Add(new IngredientModel
						{
							Id = (int)reader[idOrdinal],
							Quantity = (double)reader[quantityOrdinal]
						});

					if (!reader.NextResult())
						throw new InvalidOperationException("Missing recipe result.");

					var recipeIdOrdinal = reader.GetOrdinal("RecipeId");
					while (reader.Read())
						recipes.Add((int)reader[recipeIdOrdinal]);

					if (!reader.NextResult())
						throw new InvalidOperationException("Missing plan result.");

					var planIdOrdinal = reader.GetOrdinal("Id");
					var planNameOrdinal = reader.GetOrdinal("Name");
					while (reader.Read())
						plans.Add(new PlanModel
						{
							Id = (int)reader[planIdOrdinal],
							Name = (string)reader[planNameOrdinal],
							Target = null,
							Meals = null
						});

					return food;
				}
			}
		}

		public static int UpdateFood(int userId, FoodModel food)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Food_M"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@id", food.Id);
				command.Parameters.AddWithValue("@name", food.Name);
				command.Parameters.AddWithValue("@unitSize", food.UnitSize);
				command.Parameters.AddWithValue("@unitMeasure", food.UnitMeasure);
				command.Parameters.AddWithValue("@siteUrl", food.SiteUrl);
				command.Parameters.AddWithValue("@protein", food.Nutrition.Protein);
				command.Parameters.AddWithValue("@fat", food.Nutrition.Fat);
				command.Parameters.AddWithValue("@carbohydrates", food.Nutrition.Carbohydrates);
				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");
					return (int)reader["Id"];
				}
			}
		}

		public static int UpdateRecipe(int userId, RecipeModel recipe)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Recipe_M"))
			using (var ingredients = new DataTable())
			{
				ingredients.Columns.Add("Id", typeof(int));
				ingredients.Columns.Add("Quantity", typeof(double));
				foreach (var ingredient in recipe.Ingredients)
					ingredients.Rows.Add(ingredient.Id, ingredient.Quantity);

				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@id", recipe.Id);
				command.Parameters.AddWithValue("@name", recipe.Name);
				command.Parameters.AddWithValue("@unitSize", recipe.UnitSize);
				command.Parameters.AddWithValue("@unitMeasure", recipe.UnitMeasure);
				command.Parameters.AddWithValue("@siteUrl", recipe.SiteUrl);
				command.Parameters.Add(new SqlParameter("@ingredients", SqlDbType.Structured)
				{
					TypeName = "Diet.udt_Ingredients",
					Value = ingredients
				});

				using (var reader = command.ExecuteReader())
				{
					if (!reader.Read())
						throw new InvalidOperationException("Missing result.");
					return (int)reader["Id"];
				}
			}
		}

		public static void DeleteFood(int userId, int id)
		{
			using (var connection = CreateConnection())
			using (var command = connection.CreateCommand("usp_Food_D"))
			{
				command.Parameters.AddWithValue("@userId", userId);
				command.Parameters.AddWithValue("@id", id);
				command.ExecuteNonQuery();
			}
		}
	}
}
