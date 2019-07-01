using Newtonsoft.Json;

namespace DietApi.Models
{
	public class UserInfoModel
	{
		[JsonProperty("email")]
		public string Email { get; set; }

		[JsonProperty("id")]
		public string Id { get; set; }
	}
}
