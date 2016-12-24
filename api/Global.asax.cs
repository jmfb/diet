using System;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace DietApi
{
	public class WebApiApplication : HttpApplication
	{
		protected void Application_Start()
		{
			GlobalConfiguration.Configure(Register);
		}

		private static void Register(HttpConfiguration config)
		{
			config.MapHttpAttributeRoutes();
			config.Routes.MapHttpRoute("DefaultApi", "{controller}/{action}");
			config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CustomContractResolver();
		}

		private class CustomContractResolver : CamelCasePropertyNamesContractResolver
		{
			protected override JsonDictionaryContract CreateDictionaryContract(Type objectType)
			{
				var contract = base.CreateDictionaryContract(objectType);
				contract.DictionaryKeyResolver = dictionaryKey => dictionaryKey;
				return contract;
			}
		}
	}
}
