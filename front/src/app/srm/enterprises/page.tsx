'use client'

import api from "@/lib/axiosApi";
import { useEffect, useState } from "react";
import { FaBuilding, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import Form from 'next/'

export default function Page() {
    const [enterpriseList, setEnterpriseList] = useState<any>([]);
    const [formOn,setFormOn] = useState<boolean>(false);

    const dummyDataList: any = [{
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

    const getGradient = (index) => {
        return gradients[index % gradients.length];
    };

    return (
        <div className="grid grid-cols-3 gap-5 h-48 p-6">
            {enterprises.map((enterprise, index) => (
                <Link
                    key={enterprise.idno}
                    href={`/${enterprise.idno}`}
                    passHref
                    className="flex flex-col" // Make Link a flex container if needed
                >
                    <div
                        className={`rounded-lg border border-zinc-100 bg-gradient-to-r ${getGradient(index)} p-6 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105`}
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
                                <span className="font-semibold text-zinc-700">Address: </span>
                                {enterprise.Adress}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}

            <div className="rounded-lg border h-44 border-zinc-100 bg-gradient-to-r from-gray-100 to-gray-50 p-6 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 flex flex-col justify-center items-center cursor-pointer">
                <div className="flex flex-col items-center space-y-4">
                    <FaPlus className="text-4xl text-gray-400 transition-transform duration-300 transform hover:scale-110" />
                    <h3 className="text-xl font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-300 ease-in-out">
                        Add New Company
                    </h3>
                </div>
            </div>

            {formOn &&
							<Form action="">


							</form>
            }
        </div>
    );
}
