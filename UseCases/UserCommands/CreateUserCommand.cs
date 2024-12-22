using FluentValidation;
using HireMeF.Data;
using HireMeF.Data.Entities;
using MediatR;
using System;

namespace HireMeF.UseCases.UserCommands
{
	public class CreateUserCommand : IRequest<Guid>
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public DateTime BirthDate { get; set; }
		public string Studies { get; set; }
		public double IDNP { get; set; }

		public CreateUserCommand(User user)
		{
			FirstName = user.FirstName;
			LastName = user.LastName;
			Email = user.Email;
			BirthDate = user.BirthDate;
			Studies = user.Studies;
			IDNP = user.IDNP;
		}
	}

	public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Guid>
	{
		private readonly ApplicationDbContext _appDbContext;

		public CreateUserCommandHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
		{
			var userToAdd = new User
			{
				Id = Guid.NewGuid(),
				FirstName = request.FirstName,
				LastName = request.LastName,
				Email = request.Email,
				BirthDate = request.BirthDate,
				Studies = request.Studies,
				IDNP = request.IDNP
			};

			_appDbContext.Users.Add(userToAdd);
			await _appDbContext.SaveChangesAsync(cancellationToken);

			return userToAdd.Id;
		}
	}

	public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
	{
		public CreateUserCommandValidator()
		{
			RuleFor(f => f.IDNP)
			.NotNull()
			.NotEmpty();
		}
	}
}
