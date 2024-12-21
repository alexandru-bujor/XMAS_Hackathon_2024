'use client'

import api from "@/lib/axiosApi";
import { useEffect, useState } from "react";
import { FaBuilding } from 'react-icons/fa';
import Link from 'next/link'; // Import Link

export default function Page({params}) {
    const {enterprise} = params;
    const [enterpriseList, setEnterpriseList] = useState<any>([]);

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
    },{
        "name": "ООО Пивасик",
        "idno": "123121230",
        "Date": "12.01.1910",
        "Adress": "Strada Uzinelor 21A"
    }];

    const enterprises = enterpriseList.length > 0 ? enterpriseList : dummyDataList;

    // Array of even lighter gradients
    const gradients = [
        "from-pink-100 to-yellow-50",
        "from-blue-100 to-teal-50",
        "from-purple-100 to-indigo-50",
        "from-red-100 to-orange-50",
        "from-green-100 to-blue-50",
        "from-gray-100 to-gray-50"
    ];

    // Function to get next gradient in sequence
    const getGradient = (index) => {
        return gradients[index % gradients.length];
    };

    return (
       <div>{enterprise}</div>
    );
}
