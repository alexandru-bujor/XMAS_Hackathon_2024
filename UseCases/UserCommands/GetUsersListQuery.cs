using MediatR;
using Microsoft.EntityFrameworkCore;
using HireMeF.Data;
using HireMeF.Data.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace HireMeF.UseCases.UserCommands
{
	// DTO for user, simple mapping for demonstration purposes
	public class User
	{
		public Guid Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public DateTime BirthDate { get; set; }
		public string Studies { get; set; }
	}

	public class GetNotPaginatedUsersListQuery : IRequest<List<User>>
	{
	}

	public class GetNotPaginatedUsersListQueryHandler : IRequestHandler<GetNotPaginatedUsersListQuery, List<User>>
	{
		private readonly ApplicationDbContext _appDbContext;

		public GetNotPaginatedUsersListQueryHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<List<User>> Handle(GetNotPaginatedUsersListQuery request, CancellationToken cancellationToken)
		{
			// Fetch all users and project them to UserDto
			var users = await _appDbContext.Users
				.Select(user => new User
				{
					Id = user.Id,
					FirstName = user.FirstName,
					LastName = user.LastName,
					Email = user.Email,
					BirthDate = user.BirthDate,
					Studies = user.Studies
				}).ToListAsync(cancellationToken);

			return users;
		}
	}
}
