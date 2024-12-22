namespace HireMeF.Data.Entities
{
	public class Salaries
	{
		public Guid Id { get; set; }
		public double SalariesAmount { get; set; }
		public double TaxAmount { get; set; } //din salariu se calculeaza 
		public double TaxSalarAmount { get; set; }

	}
}
