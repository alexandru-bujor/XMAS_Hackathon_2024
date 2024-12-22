using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using HireMeF.UseCases.UserCommands;
using HireMeF.Data.Entities;

[ApiController]
[Route("api/v1")]
public class CompanyController : ControllerBase
{
	private readonly IMediator _mediator;

	public UsersController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpPost("create-company")]
	public async Task<Guid> CreateCompanyCommad([FromBody] Company request)
	{
		return await _mediator.Send(new CreateCompanyCommand(request));
	}

	[HttpGet("company/{id}")]
	public async Task<User> GetCompanyById([FromRoute] Guid id)
	{
		return await _mediator.Send(new GetCompanyByIdQuery(id));
	}
}
