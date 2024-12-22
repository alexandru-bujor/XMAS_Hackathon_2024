using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using HireMeF.UseCases.UserCommands;
using HireMeF.Data.Entities;
using HireMeF.UseCases.CompanyCommands;

[ApiController]
[Route("[controller]")]
public class CompanyController : ControllerBase
{
	private readonly IMediator _mediator;

	public CompanyController(IMediator mediator)
	{
		_mediator = mediator;
	}


	[HttpPost("create-company")]
	public async Task<Guid> CreateCompanyCommad([FromBody] Company request)
	{
		return await _mediator.Send(new CreateCompanyCommand(request));
	}

	[HttpGet("company/{id}")]
	public async Task<Company> GetCompanyById([FromRoute] Guid id)
	{
		return await _mediator.Send(new GetCompanyByIdQuery(id));
	}

	[HttpGet("list")]
	public async Task<List<Company>> GetCompaniesList()
	{
		return await _mediator.Send(new GetNotPaginatedCompaniesListQuery());
	}
}

