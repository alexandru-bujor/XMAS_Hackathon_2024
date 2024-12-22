using HireMeF.Data.Entities;
using HireMeF.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

using MediatR;
using HireMeF.UseCases.SalariesCommands;

namespace HireMeF.UseCases.SalariesCommands
{
	public class CalculateTaxAndSalaryCommand : IRequest<SalaryCalculationResult>
	{
	}

	public class SalaryCalculationResult
	{
		public double TotalSalary { get; set; }
		public double TotalTax { get; set; }
		public double TotalExpense { get; set; }  // Total salary plus tax
	}

}


// Method to calculate salary after tax for all employees
public class CalculateTaxAndSalaryCommandHandler : IRequestHandler<CalculateTaxAndSalaryCommand, SalaryCalculationResult>
{
	private readonly ApplicationDbContext _context;

	public CalculateTaxAndSalaryCommandHandler(ApplicationDbContext context)
	{
		_context = context;
	}

	public async Task<SalaryCalculationResult> Handle(CalculateTaxAndSalaryCommand request, CancellationToken cancellationToken)
	{
		var employees = await _context.Employees.ToListAsync(cancellationToken);

		if (employees == null || !employees.Any())
			throw new ArgumentException("No employees found.");

		double totalSalary = employees.Sum(e => e.SalaryAmount);
		double taxRate = 0.12;  // Fixed tax rate of 12%
		double totalTax = totalSalary * taxRate;
		double totalExpense = totalSalary + totalTax;  // Total expense including taxes

		// Optionally update the database with these values
		var salaryRecord = new Salaries
		{
			Id = Guid.NewGuid(),
			SalariesAmount = totalSalary,
			TaxAmount = totalTax,
			TaxSalarAmount = totalExpense
		};
		_context.Salaries.Add(salaryRecord);
		await _context.SaveChangesAsync(cancellationToken);

		return new SalaryCalculationResult
		{
			TotalSalary = totalSalary,
			TotalTax = totalTax,
			TotalExpense = totalExpense
		};
	}
}