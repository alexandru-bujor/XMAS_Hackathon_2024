using Ollama;
using Ollama.Client;
using System.Threading.Tasks;

namespace MoldovaCompanyRegistrationAI.Services
{
    public class CompanyRegistrationBotService
    {
        private readonly OllamaClient _ollamaClient;

        public CompanyRegistrationBotService()
        {
            _ollamaClient = new OllamaClient("RoLama");  // Use the appropriate AI model name
        }

        public async Task<string> GetResponseAsync(string userQuestion)
        {
            // Map user question to Ollama prompt
            string prompt = userQuestion.ToLower() switch
            {
                var q when q.Contains("register") && q.Contains("company") => "Tell me how to register an IT company in Moldova.",
                var q when q.Contains("required documents") => "What documents are required to register an IT company in Moldova?",
                var q when q.Contains("cost") => "What is the cost to register an IT company in Moldova?",
                var q when q.Contains("steps") => "What are the steps to register an IT company in Moldova?",
                _ => "Sorry, I can only provide information about registering an IT company in Moldova."
            };

            // Get the response from Ollama
            var response = await _ollamaClient.CompletionAsync(prompt);
            return response;
        }
    }
}
