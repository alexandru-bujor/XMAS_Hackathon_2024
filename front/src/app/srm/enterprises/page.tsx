'use client'

import api from "@/lib/axiosApi";
import { useEffect, useState, useRef } from "react";
import { FaBuilding, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import Header from "@/components/ui/Header";

const companyDropDownTypes = [
    {
        name:"SRL",
        index: 1,
    },
    {
        name:"II",
        index: 2,
    },
    {
        name:"IF",
        index: 3,
    },
    {
        name:"SA",
        index: 4,
    },
    {
        name:"Rezidenti IT",
        index: 5,
    },
]

export default function Page() {
    const [enterpriseList, setEnterpriseList] = useState<any>([]);
    const [formOn, setFormOn] = useState<boolean>(false);
    const formRef = useRef<HTMLDivElement>(null);
    const [selectedCompanyType, setSelectedCompanyType] = useState<string>("");
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        founder: "",
        date: "",
        address: "",
    });

    const handleCompanyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCompanyType(e.target.value);
        setFormData(prev => ({ ...prev, type: e.target.value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleOnClick = () => {
        setFormOn(true);
    };

    const handleClickOutside = (e: React.MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
            setFormOn(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create new company object
        const newCompany = {
            name: `${formData.type} ${formData.name}`,
            idno: Math.floor(Math.random() * 1000000000000).toString(), // Generate random ID for demo
            Date: formData.date,
            Adress: formData.address // Note: keeping original spelling from dummy data
        };

        // Add to existing list
        setEnterpriseList(prev => [...prev, newCompany]);
        
        // Reset form
        setFormData({
            name: "",
            type: "",
            founder: "",
            date: "",
            address: "",
        });
        setSelectedCompanyType("");
        setFormOn(false);
    };

    let dummyDataList: any = [{
        "name": "SRL Tucano Coffee",
        "idno": "101010101010102",
        "Date": "31.01.2014",
        "Adress": "Baker street 221B"
    },{
        "name": "SRL Sigmoid",
        "idno": "1230123012",
        "Date": "31.03.2010",
        "Adress": "Stafan cel Mare 222"
    },
    {
        "name": "SRL Sigmoid",
        "idno": "12301123012",
        "Date": "31.03.2010",
        "Adress": "Stafan cel Mare 222"
    },
    {
        "name": "ООО Пивасик",
        "idno": "123121230",
        "Date": "12.01.1910",
        "Adress": "Strada Uzinelor 21A"
    }];

    const enterprises = enterpriseList.length > 0 ? enterpriseList : dummyDataList;

    const gradients = [
        "from-pink-100 to-yellow-50",
        "from-blue-100 to-teal-50",
        "from-purple-100 to-indigo-50",
        "from-red-100 to-orange-50",
        "from-green-100 to-blue-50"
    ];

    const getGradient = (index:number) => {
        return gradients[index % gradients.length];
    };

    return (
        <>
            <div className="flex flex-row flex-wrap gap-6 p-6">
                {enterprises.map((enterprise, index:number) => (
                    <Link
                        key={enterprise.idno}
                        href={`/${enterprise.idno}`}
                        passHref
                        className="flex-none h-48"
                    >
                        <div
                            className={`w-80 h-full rounded-lg border border-zinc-100 bg-gradient-to-r ${getGradient(index)} p-6 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105`}
                        >
                            <div className="flex items-center space-x-3 mb-3">
                                <FaBuilding className="text-2xl text-teal-400 transition-transform duration-300 transform hover:scale-110" />
                                <h3 className="text-xl font-semibold text-zinc-800 mb-0 hover:text-gray-500 transition-colors duration-300 ease-in-out truncate">
                                    {enterprise.name}
                                </h3>
                            </div>
                            <div className="space-y-2 text-zinc-600 overflow-y-auto">
                                <p className="text-base font-medium">
                                    <span className="font-semibold text-zinc-700">ID: </span>
                                    {enterprise.idno}
                                </p>
                                <p className="text-base font-medium">
                                    <span className="font-semibold text-zinc-700">Date: </span>
                                    {enterprise.Date}
                                </p>
                                <p className="text-base font-medium">
                                    <span className="font-semibold text-zinc-700">Juridical Address: </span>
                                    {enterprise.Adress}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}

                <div 
                    onClick={handleOnClick} 
                    className="flex-none w-80 h-48 rounded-lg border border-zinc-100 bg-gradient-to-r from-gray-100 to-gray-50 p-6 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center cursor-pointer"
                >
                    <div className="flex flex-col items-center space-y-4">
                        <FaPlus className="text-4xl text-gray-400 transition-transform duration-300 transform hover:scale-110" />
                        <h3 className="text-xl font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-300 ease-in-out">
                            Add New Company
                        </h3>
                    </div>
                </div>
            </div>

            {formOn && (
                <>
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center"
                        onClick={handleClickOutside}
                    >
                        <div 
                            ref={formRef}
                            className="bg-white rounded-lg p-6 shadow-lg w-[400px] z-30"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Company name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your company"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="companyType" className="block text-sm font-medium mb-2">
                                        Company Type
                                    </label>
                                    <select
                                        id="companyType"
                                        value={selectedCompanyType}
                                        onChange={handleCompanyTypeChange}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="">Select company type</option>
                                        {companyDropDownTypes.map((type) => (
                                            <option key={type.index} value={type.name}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="founder" className="block text-sm font-medium mb-2">
                                        Founder's name
                                    </label>
                                    <input
                                        type="text"
                                        id="founder"
                                        value={formData.founder}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter founder's name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium mb-2">
                                        Date of Registration
                                    </label>
                                    <input
                                        type="text"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="DD.MM.YYYY"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter address"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-black text-gray-200 hover:bg-[#00B99A] font-semibold rounded-full w-full py-3 transition-all duration-300"
                                >
                                    Add Company
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}