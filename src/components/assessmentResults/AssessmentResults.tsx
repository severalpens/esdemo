import  {  useEffect, useState } from 'react';
import axios from 'axios';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';

interface Assessment{
    search_term: string;
    result_1_title: string;
    result_1_type: string;
    result_1_short_description: string;
    result_1_faq_short_answer: string;
    result_1_es_score: string;
    result_2_title: string;
    result_2_type: string;
    result_2_short_description: string;
    result_2_faq_short_answer: string;
    result_2_es_score: string;
    result_3_title: string;
    result_3_type: string;
    result_3_short_description: string;
    result_3_faq_short_answer: string;
    result_3_es_score: string;
    result_quality: string;
    preferred_answer_position: string;
    failure_reason: string;
    comments: string;
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
                        <th className="border border-gray-300">Search Term</th>
                        <th className="border border-gray-300">Result 1 Title</th>
                        <th className="border border-gray-300">Result 1 Type</th>
                        <th className="border border-gray-300">Result 1 ES Score</th>
                        <th className="border border-gray-300">Result 2 Title</th>
                        <th className="border border-gray-300">Result 2 Type</th>
                        <th className="border border-gray-300">Result 2 ES Score</th>
                        <th className="border border-gray-300">Result 3 Title</th>
                        <th className="border border-gray-300">Result 3 Type</th>
                        <th className="border border-gray-300">Result 3 ES Score</th>
                        <th className="border border-gray-300">Result Quality</th>
                        <th className="border border-gray-300">Failure Reason</th>
                        <th className="border border-gray-300">Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {assessments.map((a, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300">{a.search_term}</td>
                            <td className="border border-gray-300">{a.result_1_title}</td>
                            <td className="border border-gray-300">{a.result_1_type}</td>
                            <td className="border border-gray-300">{a.result_1_es_score}</td>
                            <td className="border border-gray-300">{a.result_2_title}</td>
                            <td className="border border-gray-300">{a.result_2_type}</td>
                            <td className="border border-gray-300">{a.result_2_es_score}</td>
                            <td className="border border-gray-300">{a.result_3_title}</td>
                            <td className="border border-gray-300">{a.result_3_type}</td>
                            <td className="border border-gray-300">{a.result_3_es_score}</td>
                            <td className="border border-gray-300">{a.result_quality}</td>
                            <td className="border border-gray-300">{a.failure_reason}</td>
                            <td className="border border-gray-300">{a.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

