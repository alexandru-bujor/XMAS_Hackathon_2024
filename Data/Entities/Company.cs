namespace HireMeF.Data.Entities
{
	public class Company
	{
		public Guid Id;
		public string Name { get; set; }
		public string Type { get; set; }
		public bool IsActive { get; set; }
		public DataTime CreationDate { get; set; }
		public string Address { get; set; }
        public double Turnover { get; set; }
	}
}