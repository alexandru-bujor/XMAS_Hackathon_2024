using Microsoft.AspNetCore.Mvc;
using MoldovaCompanyRegistrationAI.Services;
using System.Threading.Tasks;

namespace MoldovaCompanyRegistrationAI.Controllers
{
    public class HomeController : Controller
    {
        private readonly CompanyRegistrationBotService _botService;

        public HomeController(CompanyRegistrationBotService botService)
        {
            _botService = botService;
        }

        // GET: Home
        public IActionResult Index()
        {
            return View();
        }

        // POST: Home/AskQuestion
        [HttpPost]
        public async Task<IActionResult> AskQuestion(string userQuestion)
        {
            if (string.IsNullOrEmpty(userQuestion))
            {
                return RedirectToAction("Index");
            }

            // Get the response from the AI service
            string response = await _botService.GetResponseAsync(userQuestion);
            ViewBag.Response = response;

            return View("Index");
        }
    }
}
