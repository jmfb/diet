using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DietApi.Models;

namespace DietApi.Controllers
{
	public class AuthenticationController : ApiController
	{
		[HttpGet]
		public virtual string GetAuthenticationUrl(string redirectUrl)
		{
			return AuthenticationService.GetGoogleAuthenticationUrl(redirectUrl);
		}

		[HttpGet]
		public virtual async Task<LoginModel> Login(string redirectUrl, string authorizationCode)
		{
			var googleToken = await AuthenticationService.GetGoogleToken(redirectUrl, authorizationCode);
			var userInfo = await AuthenticationService.GetUserInfo(googleToken.TokenType, googleToken.AccessToken);
			var name = userInfo.Email; //Name was removed from google oauth userinfo at some point, resort to email
			var userId = DataBridge.UpdateAccount(userInfo.Email, name);
			return new LoginModel
			{
				Token = AuthenticationService.CreateAuthorizationToken(userId),
				Name = name
			};
		}
	}
}
