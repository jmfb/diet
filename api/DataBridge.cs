using System;
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
				command.Parameters.AddWithValue("@genderId", profile.GenderId);
				command.Parameters.AddWithValue("@bodyTypeId", profile.BodyTypeId);
				command.Parameters.AddWithValue("@heightInInches", profile.HeightInInches);
				command.Parameters.AddWithValue("@birthYear", profile.BirthYear);
				command.Parameters.AddWithValue("@targetWeightInPounds", profile.TargetWeightInPounds);
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
	}
}
