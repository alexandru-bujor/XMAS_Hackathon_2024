using MediatR;
using Microsoft.EntityFrameworkCore;
using HireMeF.Data;
using HireMeF.Data.Entities;


namespace HireMeF.UseCases.CompanyCommands
{
	public class GetNotPaginatedCompaniesListQuery : IRequest<List<Company>>
	{
	}

	public class GetNotPaginatedCompaniesListQueryHandler : IRequestHandler<GetNotPaginatedCompaniesListQuery, List<Company>>
	{
		private readonly ApplicationDbContext _appDbContext;

		public GetNotPaginatedCompaniesListQueryHandler(ApplicationDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task<List<Company>> Handle(GetNotPaginatedCompaniesListQuery request, CancellationToken cancellationToken)
		{
			var companies = await _appDbContext.Companies.ToListAsync(cancellationToken);
			return companies;
		}
	}
}

