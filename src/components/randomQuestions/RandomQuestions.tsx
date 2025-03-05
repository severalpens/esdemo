import React, {  useEffect, useState } from 'react';
import axios from 'axios';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';


interface RandomQuestionsProps {
    completedAssessments: string[];
    filterSearch:  ((rq: string) => void);
}

interface RandomQuestion{
    id: string;
    search_term: string;
    expected_result: string;
}

export default function RandomQuestions({ completedAssessments, filterSearch }: RandomQuestionsProps) {
    const [randomQuestions, setRandomQuestions] = useState<RandomQuestion[]>([]);
    const [ ,setSearchTerms] = useState<string[]>([]);
    const [expectedResult, setExpectedResult] = useState<string>('');
    useEffect(() => {
        const getRandomQuestions = async () => {
            const { data } = await  axios.get(`${elasticsearchProxyUri}/getRandomQuestions`);
            console.log(data);
            setRandomQuestions(data);
            setSearchTerms(data.map((st: RandomQuestion) => st.search_term));
        }
        getRandomQuestions();
    }
    , []);

    return (
        <div>
        <div>
            {expectedResult}
        </div>
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
                                onClick={() => { 
                                     filterSearch(rq.search_term);
                                     setExpectedResult(rq.expected_result);
                                    }}
                                className={`cursor-pointer hover:bg-gray-100 ${completedAssessments.includes(rq.search_term) ? 'line-through' : ''}`}
                            >
                                {rq.search_term}
                            </td>
                                
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
        );
}

