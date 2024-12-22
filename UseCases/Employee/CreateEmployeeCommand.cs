using FluentValidation;
using HireMeF.Data;
using HireMeF.Data.Entities;
using MediatR;
using System;

namespace HireMeF.UseCases.EmployeeCommands
{
	public class CreateEmployeeCommand : IRequest<Guid>
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public DateTime BirthDate { get; set; }
		public string Studies { get; set; }
		public double SalaryAmount { get; set; }
		public string JobTitle { get; set; }
		public string Department { get; set; }
		public int Holidays { get; set; }


		public CreateEmployeeCommand(Employee employee)
		{
			FirstName = employee.FirstName;
			LastName = employee.LastName;
			Email = employee.Email;
			BirthDate = employee.BirthDate;
			Studies = employee.Studies;
			SalaryAmount = employee.SalaryAmount;
			JobTitle = employee.JobTitle;
			Department = employee.Department;
			Holidays = employee.Holidays;
		}
	}

	public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, Guid>
	{
		private readonly ApplicationDbContext _appDbContext;

		public CreateEmployeeCommandHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<Guid> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
		{
			var employeeToAdd = new Data.Entities.Employee
			{
				Id = Guid.NewGuid(),
				FirstName = request.FirstName,
				LastName = request.LastName,
				Email = request.Email,
				BirthDate = request.BirthDate,
				Studies = request.Studies,
				SalaryAmount = request.SalaryAmount,
				JobTitle = request.JobTitle,
				Department = request.Department,
				Holidays = request.Holidays
			};

			_appDbContext.Employees.Add(employeeToAdd);
			await _appDbContext.SaveChangesAsync(cancellationToken);

			return employeeToAdd.Id;
		}
	}
}
