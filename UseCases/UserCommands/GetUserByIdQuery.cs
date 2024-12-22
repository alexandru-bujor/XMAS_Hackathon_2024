using FluentValidation;
using HireMeF.Data;
using HireMeF.Data.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HireMeF.UseCases.UserCommands
{
	public class GetUserByIdQuery : IRequest<User>
	{
		public GetUserByIdQuery(Guid id)
		{
			Id = id;
		}
		public Guid Id { get; set; }
	}

	public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, User>
	{
		private readonly ApplicationDbContext _appDbContext;

		public GetUserByIdQueryHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<User> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
		{
			return await _appDbContext.Users
									  .FirstOrDefaultAsync(f => f.Id == request.Id, cancellationToken);
		}

		public class GetUserByIdQueryValidator : AbstractValidator<GetUserByIdQuery>
		{
			public GetUserByIdQueryValidator(IServiceProvider services)
			{
				RuleFor(d => d.Id).NotEmpty().WithMessage("User ID must not be empty");

				RuleFor(d => d).Custom((obj, context) =>
				{
					using var scope = services.CreateScope();
					var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

					var userExists = db.Users.Any(f => f.Id == obj.Id);
					if (!userExists)
					{
						context.AddFailure("Invalid user ID");
					}
				});
			}
		}
	}
}
