'use client';

import { useState, useRef } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';

export default function DocumentManager() {
    const [documentList, setDocumentList] = useState([]);
    const dropRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(
            (file) => file.type === 'application/pdf'
        );

        const newDocuments = files.map((file) => ({
            name: file.name,
            file,
            id: crypto.randomUUID(),
        }));

        setDocumentList((prev) => [...prev, ...newDocuments]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDelete = (id) => {
        setDocumentList((prev) => prev.filter((doc) => doc.id !== id));
    };

    const handleView = (file) => {
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
    };

    return (
        <div className="p-6">
            <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50"
            >
                Drag & Drop your PDF files here or click to upload
            </div>

            <ul className="mt-6 space-y-4">
                {documentList.map((doc) => (
                    <li
                        key={doc.id}
                        className="flex justify-between items-center border p-3 rounded-md shadow-sm bg-white"
                    >
                        <span className="truncate w-3/4 text-gray-800">
                            {doc.name}
                        </span>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => handleView(doc.file)}
                                className="text-blue-500 hover:text-blue-700"
                                title="View PDF"
                            >
                                <FaEye />
                            </button>

                            <button
                                onClick={() => handleDelete(doc.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete PDF"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
