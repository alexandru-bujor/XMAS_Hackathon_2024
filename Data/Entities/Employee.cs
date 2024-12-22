namespace HireMeF.Data.Entities
{
	public class Employee
	{
		public Guid Id;
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public DateTime BirthDate { get; set; }
		public string Studies { get; set; } = string.Empty;
		public double SalaryAmount { get; set; }
		public string JobTitle { get; set; } = string.Empty;
		public string Department { get; set; } = string.Empty;
		public int Holidays { get; set; }
		/*public Company Company { get; set; }
		public Guid CompanyId { get; set; }*/
	}
}
