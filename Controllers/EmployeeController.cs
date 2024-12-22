using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using HireMeF.Data.Entities; 
using HireMeF.UseCases.EmployeeCommands;
using HireMeF.UseCases.EmployeesCommands;  

[ApiController]
[Route("[controller]")]
public class EmployeesController : ControllerBase
{
	private readonly IMediator _mediator;

	public EmployeesController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpPost("create-employee")]
	public async Task<IActionResult> CreateEmployee([FromBody] Employee request)
	{
		try
		{
			var id = await _mediator.Send(new CreateEmployeeCommand(request));
			return Ok(id); 
		}
		catch (Exception ex)
		{
			return BadRequest(ex.Message); 
		}
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetEmployeeById([FromRoute] Guid id)
	{
		var employee = await _mediator.Send(new GetEmployeeByIdQuery(id));
		if (employee != null)
			return Ok(employee);
		else
			return NotFound();
	}

	[HttpGet("list")]
	public async Task<IActionResult> GetEmployeesList()
	{
		var employees = await _mediator.Send(new GetEmployeesListQuery());
		return Ok(employees);
	}
}
