using System.Reflection;
using System.Resources;
using static Api.Models.MessageErrorEnum;

namespace Api.Message
{
    public class CodeMessage
    {
        public static string? MyErrorMessage(ApiMessage message)
        {
            ResourceManager rm = new ResourceManager("Api.Message.ApiMsg", Assembly.GetExecutingAssembly());

            string? errorMessage = rm.GetString(nameof(message));

            return errorMessage;

        }
    }
}
