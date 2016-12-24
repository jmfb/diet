using System.Web.Http;

namespace DietApi.Controllers
{
	[AuthorizeAccount]
	public class AuthorizedController : ApiController
	{
		protected int UserId => (int)Request.Properties["UserId"];
	}
}
