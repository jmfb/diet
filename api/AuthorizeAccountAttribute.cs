using System.Web.Http;
using System.Web.Http.Controllers;

namespace DietApi
{
	public class AuthorizeAccountAttribute : AuthorizeAttribute
	{
		protected override bool IsAuthorized(HttpActionContext actionContext)
		{
			var userId = AuthenticationService.Authorize(actionContext.Request.Headers.Authorization);
			if (userId == null)
				return false;
			actionContext.Request.Properties["UserId"] = userId.Value;
			return true;
		}
	}
}
