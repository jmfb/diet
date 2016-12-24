using Newtonsoft.Json;

namespace DietApi.Models
{
	public class UserInfoModel
	{
		[JsonProperty("family_name")]
		public string FamilyName { get; set; }

		[JsonProperty("name")]
		public string Name { get; set; }

		[JsonProperty("picture")]
		public string Picture { get; set; }

		[JsonProperty("gender")]
		public string Gender { get; set; }

		[JsonProperty("email")]
		public string Email { get; set; }

		[JsonProperty("link")]
		public string Link { get; set; }

		[JsonProperty("given_name")]
		public string GivenName { get; set; }

		[JsonProperty("id")]
		public string Id { get; set; }

		[JsonProperty("verified_email")]
		public bool VerifiedEmail { get; set; }
	}
}
