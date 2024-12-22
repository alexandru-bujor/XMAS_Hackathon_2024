using Microsoft.AspNetCore.Mvc;
using MediatR;
using System;
using System.Threading.Tasks;
using HireMeF.UseCases.SalariesCommands;

[ApiController]
[Route("[controller]")]
public class SalaryController : ControllerBase
{
	private readonly IMediator _mediator;

	public SalaryController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet("calculate-tax-and-salary")]
	public async Task<IActionResult> CalculateTaxAndSalary()
	{
		try
		{
			var result = await _mediator.Send(new CalculateTaxAndSalaryCommand());
			return Ok(result);
		}
		catch (Exception ex)
		{
			return StatusCode(500, $"Internal server error: {ex.Message}");
		}
	}
}
