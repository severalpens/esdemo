import  {  useEffect, useState } from 'react';
import axios from 'axios';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';

interface Assessment{
Id: number,
search_id: string,
search_term: string,
author_name: string,
comments: string,
timestamp: string

}


export default function AssessmentResults(){   
const [assessments, setAssessments] = useState<Assessment[]>([]);
useEffect(() => {
    const getAssessments = async () => {
        const { data } = await axios.get(`${elasticsearchProxyUri}/getAssessments`);
        console.log(data);
        setAssessments(data);
    }
    getAssessments();
}
, []);

    return (
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse border border-gray-400">
                <thead className="sticky top-0 bg-white">
                    <tr>
                        <th className="border border-gray-300">ID</th>
                        <th className="border border-gray-300">Search ID</th>
                        <th className="border border-gray-300">Search Term</th>
                        <th className="border border-gray-300">Author Name</th>
                        <th className="border border-gray-300">Comments</th>
                        <th className="border border-gray-300">Timestamp</th>

                    </tr>
                </thead>
                <tbody>
                    {assessments.map((a, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300">{a.Id}</td>
                            <td className="border border-gray-300">{a.search_id}</td>
                            <td className="border border-gray-300">{a.search_term}</td>
                            <td className="border border-gray-300">{a.author_name}</td>
                            <td className="border border-gray-300">{a.comments}</td>
                            <td className="border border-gray-300">{a.timestamp}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

