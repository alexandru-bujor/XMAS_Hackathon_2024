using MediatR;
using Microsoft.EntityFrameworkCore;
using HireMeF.Data;
using HireMeF.Data.Entities;


namespace HireMeF.UseCases.EmployeesCommands
{
	public class GetEmployeesListQuery : IRequest<List<Employee>>
	{
	}

	public class GetEmployeesListQueryHandler : IRequestHandler<GetEmployeesListQuery, List<Employee>>
	{
		private readonly ApplicationDbContext _appDbContext;

		public GetEmployeesListQueryHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<List<Employee>> Handle(GetEmployeesListQuery request, CancellationToken cancellationToken)
		{
			var employee = await _appDbContext.Employees
				.Select(employee => new Employee
				{
					Id = employee.Id,
					FirstName = employee.FirstName,
					LastName = employee.LastName,
					Email = employee.Email,
					BirthDate = employee.BirthDate,
					Studies = employee.Studies,
					SalaryAmount = employee.SalaryAmount,
					JobTitle = employee.JobTitle,
					Department = employee.Department,
					Holidays = employee.Holidays
				}).ToListAsync(cancellationToken);

			return employee;
		}
	}
}
