namespace HireMeF.Data.Entities
{
	public class User
	{
	
		public Guid Id;
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public DateTime BirthDate { get; set; }
		public string Studies { get; set; } = string.Empty;
		public double IDNP { get; set; }

		//DE ADAUGAT ROL AICI OWNER SAU EMPLOYEE
	}
}
