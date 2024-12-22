using FluentValidation;
using HireMeF.Data;
using HireMeF.Data.Entities;
using MediatR;
using System;

namespace HireMeF.UseCases.CompanyCommands
{
	public class CreateCompanyCommand : IRequest<Guid>
	{
		public Guid Id;
		public string Name { get; set; }
		public string Type { get; set; }
		public bool IsActive { get; set; }
		public DataTime CreationDate { get; set; }
		public string Address { get; set; }
        public double Turnover { get; set; }

		public CreateCompanyCommand(Company company)
		{
			Name = company.Name;
			Type = company.Type;
			IsActive = company.IsActive;
			CreationDate = company.CreationDate;
			Address = company.Address;
            Turnover = company.Turnover;
		}
	}

	public class CreateCompanyCommandHandler : IRequestHandler<CreateCompanyCommand, Guid>
	{
		private readonly ApplicationDbContext _appDbContext;

		public CreateCompanyCommandHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<Guid> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
		{
			var companyToAdd = new Company
			{
				Id = Guid.NewGuid(),
				Type = request.Type,
				IsActive = request.IsActive,
				CreationDate = request.CreationDate,
				Address = request.Address,
                Turnover = request.Turnover
			};

			_appDbContext.Companies.Add(companyToAdd);
			await _appDbContext.SaveChangesAsync(cancellationToken);

			return companyToAdd.Id;
		}
	}

	public class CreateCompanyCommandValidator : AbstractValidator<CreateCompanyCommand>
	{
		public CreateCompanyCommandValidator()
		{
			RuleFor(f => f.Name)
			.NotNull()
			.NotEmpty();
		}
	}
}
