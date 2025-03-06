import  {   useState } from 'react';

interface RandomQuestionsProps {
    filterSearch:  ((rq: string) => void);
    searchQueryTests: SearchQueryTest[];
    getRandomQuestions: (() => void);
}

interface SearchQueryTest{
    id: string;
    search_id: string;
    search_term: string;
    expected_results: string;
    result_quality: string;
    assessed:string;
}

export default function RandomQuestions({  filterSearch, searchQueryTests, getRandomQuestions }: RandomQuestionsProps) {

    const [selectedQuery, setSelectedQuery] = useState<SearchQueryTest | null>(null);


    return (
        <div>
        {selectedQuery && 
            <div className="my-4">
                <div className=""><strong>Expected Result:</strong></div>
                <p>{selectedQuery.expected_results}</p>
            </div>
        }        
            <div>
                <button onClick={getRandomQuestions} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Refresh</button>
            </div>
                    <div className="my-4">
                <div className=""><strong>Random Questions (result_quality)</strong></div>
            </div>

            <div className="flex h-screen">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {searchQueryTests.map((rq, index) => (
                        <tr key={index}>
                            <td 
                                onClick={() => { 
                                     filterSearch(rq.search_term);
                                    setSelectedQuery(rq);
                                }}
                                className={`cursor-pointer `}
                            >
                                <span className={rq.assessed ? 'line-through' : ''}>
                                    {rq.search_term} ({rq.result_quality})
                                </span>
                            </td>
                                
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
        );
}

