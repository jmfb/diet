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
			var userId = DataBridge.UpdateAccount(userInfo.Email, userInfo.Name);
			return new LoginModel
			{
				Token = AuthenticationService.CreateAuthorizationToken(userId),
				Name = userInfo.Name
			};
		}
	}
}
