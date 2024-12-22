using System;
using System.Collections.Generic;

namespace HireMeF.Data.Entities
{
	public class Company
	{
		public Guid Id;
		public string Name { get; set; }
		public CompanyType Type { get; set; }  // Updated to use enum
		public bool IsActive { get; set; }
		public DateTime CreationDate { get; set; }
		public string Address { get; set; }
		public double Turnover { get; set; }
		//public ICollection<Employee> Employees { get; set; } = new List<Employee>();
	}
}
