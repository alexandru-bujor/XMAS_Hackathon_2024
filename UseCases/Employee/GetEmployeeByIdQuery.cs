using FluentValidation;
using HireMeF.Data;
using HireMeF.Data.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HireMeF.UseCases.EmployeeCommands
{
	public class GetEmployeeByIdQuery : IRequest<Employee>
	{
		public GetEmployeeByIdQuery(Guid id)
		{
			Id = id;
		}
		public Guid Id { get; set; }
	}

	public class GetEmployeeByIdQueryHandler : IRequestHandler<GetEmployeeByIdQuery, Employee>
	{
		private readonly ApplicationDbContext _appDbContext;

		public GetEmployeeByIdQueryHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<Employee> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
		{
			return await _appDbContext.Employees
									  .FirstOrDefaultAsync(f => f.Id == request.Id, cancellationToken);
		}

		public class GetEmployeeByIdQueryValidator : AbstractValidator<GetEmployeeByIdQuery>
		{
			public GetEmployeeByIdQueryValidator(IServiceProvider services)
			{
				RuleFor(d => d.Id).NotEmpty().WithMessage("Employee ID must not be empty");

				RuleFor(d => d).Custom((obj, context) =>
				{
					using var scope = services.CreateScope();
					var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

					var employeeExists = db.Employees.Any(f => f.Id == obj.Id);
					if (!employeeExists)
					{
						context.AddFailure("Invalid Employee ID");
					}
				});
			}
		}
	}
}
