using FluentValidation;
using HireMeF.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;


namespace HireMeF.UseCases.UserCommands
{
	public class DeleteUserCommand : IRequest<Unit>
	{
		public Guid Id { get; set; }
	}
	public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Unit>
	{
		private readonly ApplicationDbContext _appDbContext;

		public DeleteUserCommandHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
		{
			var userToDelete = await _appDbContext.Users.Where(f => f.Id == request.Id).FirstOrDefaultAsync();

			_appDbContext.Users.Remove(userToDelete);
			await _appDbContext.SaveChangesAsync();

			return Unit.Value;
		}

	}
	public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
	{
		public DeleteUserCommandValidator(IServiceProvider services)
		{
			RuleFor(d => d.Id).NotEmpty().WithMessage("User ID must not be empty");

			RuleFor(d => d).Custom((obj, context) =>
			{
				using var scope = services.CreateScope();
				var db = scope.ServiceProvider.GetService<ApplicationDbContext>();

				if (db == null)
				{
					context.AddFailure("Internal problem - could not retrieve the database context.");
					return;
				}

				var userExists = db.Users.Any(f => f.Id == obj.Id);

				if (!userExists)
				{
					context.AddFailure("Invalid user ID - the user does not exist.");
				}
			});
		}
	}
}

