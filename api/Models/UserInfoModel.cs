using Newtonsoft.Json;

namespace DietApi.Models
{
	public class UserInfoModel
	{
		[JsonProperty("email")]
		public string Email { get; set; }
	}
}
