using FluentValidation;
using HireMeF.Data;
using HireMeF.Data.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HireMeF.UseCases.CompanyCommands
{
	public class GetCompanyByIdQuery : IRequest<Company>
	{
		public GetCompanyByIdQuery(Guid id)
		{
			Id = id;
		}
		public Guid Id { get; set; }
	}

	public class GetCompanyByIdQueryHandler : IRequestHandler<GetCompanyByIdQuery, Company>
	{
		private readonly ApplicationDbContext _appDbContext;

		public GetCompanyByIdQueryHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<Company> Handle(GetCompanyByIdQuery request, CancellationToken cancellationToken)
		{
			return await _appDbContext.Companies.FirstOrDefaultAsync(f => f.Id == request.Id, cancellationToken);
		}

		public class GetCompanyByIdQueryValidator : AbstractValidator<GetCompanyByIdQuery>
		{
			public GetCompanyByIdQueryValidator(IServiceProvider services)
			{
				RuleFor(d => d.Id).NotEmpty().WithMessage("Company ID must not be empty");

				RuleFor(d => d).Custom((obj, context) =>
				{
					using var scope = services.CreateScope();
					var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

					var companyExists = db.Companies.Any(f => f.Id == obj.Id);
					if (!companyExists)
					{
						context.AddFailure("Invalid company ID");
					}
				});
			}
		}
	}
}
