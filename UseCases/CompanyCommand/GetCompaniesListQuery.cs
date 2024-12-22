using MediatR;
using Microsoft.EntityFrameworkCore;
using HireMeF.Data;
using HireMeF.Data.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace HireMeF.UseCases.CompanyCommands
{

	public class GetNotPaginatedCompaniesListQuery : IRequest<List<Company>>
	{
	}

	public class GetNotPaginatedCompanysListQueryHandler : IRequestHandler<GetNotPaginatedCompanysListQuery, List<Company>>
	{
		private readonly ApplicationDbContext _appDbContext;

		public GetNotPaginatedCompanyListQueryHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<List<Company>> Handle(GetNotPaginatedCompanyListQuery request, CancellationToken cancellationToken)
		{
			var companies = await _appDbContext.Companies
				.Select(c => new Company
				{
					Id = c.Id,
					Name = c.Name,
					Type = c.Type,
					IsActive = c.IsActive,
					CreationDate = c.CreationDate,
                    Address = c.Address,
                    Turnover = c.Turnover
				}).ToListAsync(cancellationToken);

			return companies;
		}
	}
}
