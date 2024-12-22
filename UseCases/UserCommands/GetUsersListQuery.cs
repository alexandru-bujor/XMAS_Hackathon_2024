using MediatR;
using Microsoft.EntityFrameworkCore;
using HireMeF.Data;
using HireMeF.Data.Entities;


namespace HireMeF.UseCases.UserCommands
{
	

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
			var users = await _appDbContext.Users
				.Select(user => new User
				{
					Id = user.Id,
					FirstName = user.FirstName,
					LastName = user.LastName,
					Email = user.Email,
					BirthDate = user.BirthDate,
					Studies = user.Studies,
					IDNP = user.IDNP
				}).ToListAsync(cancellationToken);

			return users;
		}
	}
}
