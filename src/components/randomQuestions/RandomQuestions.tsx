import React, {  useEffect, useState } from 'react';
import axios from 'axios';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';


interface RandomQuestionsProps {
    completedAssessments: string[];
    filterSearch:  ((rq: string) => void);
}

export default function RandomQuestions({ completedAssessments, filterSearch }: RandomQuestionsProps) {
    const [randomQuestions, setRandomQuestions] = useState<string[]>([]);
    useEffect(() => {
        const getRandomQuestions = async () => {
            const { data } = await  axios.get(`${elasticsearchProxyUri}/getRandomQuestions`);
            setRandomQuestions(data);
        }
        getRandomQuestions();
    }
    , []);

    return (
        <div className="flex h-screen">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Random Questions</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {randomQuestions.map((rq, index) => (
                        <tr key={index}>
                            <td 
                                onClick={() =>  filterSearch(rq)}
                                className={`cursor-pointer hover:bg-gray-100 ${completedAssessments.includes(rq) ? 'line-through' : ''}`}
                            >
                                {rq}
                            </td>
                                
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

