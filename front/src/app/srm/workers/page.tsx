'use client'

import { useState } from 'react';

const TableThree = () => {
  const [packageData, setPackageData] = useState([
    {
      name: "John Week",
      jobTitle: "cleaner",
      department: "department",
      company: "Moldtelecom",
      salary: 5000.0,
      holidays: `20`,
      pfp: "pfp",
      id: "1",
    },
    {
      name: "Amanda Kramer",
      jobTitle: "cleaner",
      department: "department",
      company: "Moldtelecom",
      salary: 5000.0,
      holidays: `20`,
      pfp: "pfp",
      id: "2",
    },
    {
      name: "Frank Dinatra",
      jobTitle: "cleaner",
      department: "department",
      company: "Moldtelecom",
      salary: 5000.0,
      holidays: `20`,
      pfp: "pfp",
      id: "3",
    },
    {
      name: "Sulen Yana",
      jobTitle: "cleaner",
      department: "department",
      company: "Moldtelecom",
      salary: 5000.0,
      holidays: `20`,
      pfp: "pfp",
      id: "4",
    },
  ]);

  const handleClickDelete = (id) => {
    console.log("Deleted item with ID:", id);
    setPackageData(packageData.filter((item) => item.id !== id));
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Package
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Job Title
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Department
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Company
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Salary
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Holidays
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                PF Picture
              </th>
              <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem) => (
              <tr key={packageItem.id}>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">
                    {packageItem.jobTitle}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">
                    {packageItem.department}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">
                    {packageItem.company}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">
                    {packageItem.salary}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">
                    {packageItem.holidays}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <p className="text-dark dark:text-white">
                    {packageItem.pfp}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5">
                  <div className="flex items-center justify-end space-x-3.5">
                    <button
                      className="hover:text-[#00B99A]"
                      onClick={() => handleClickDelete(packageItem.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
