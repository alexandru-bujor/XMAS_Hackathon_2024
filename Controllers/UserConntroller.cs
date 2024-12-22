using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using HireMeF.UseCases.UserCommands;
using HireMeF.Data.Entities;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
	private readonly IMediator _mediator;

	public UsersController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpPost("create-user")]
	public async Task<Guid> CreateUserCommand([FromBody] User request)
	{
		return await _mediator.Send(new CreateUserCommand(request));
	}

	[HttpGet("{id}")]
	public async Task<User> GetUserById([FromRoute] Guid id)
	{

		return await _mediator.Send(new GetUserByIdQuery(id));
	}

	[HttpGet("list")]
	public async Task<List<User>> GetUsersList()
	{
		return await _mediator.Send(new GetNotPaginatedUsersListQuery());
	}
}

