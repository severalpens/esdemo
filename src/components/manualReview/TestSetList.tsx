
interface RandomQuestionsProps {
    filterSearch:  ((rq: string) => void);
    searchQueryTests: SearchQueryTest[];
    getRandomQuestions: (() => void);
    setSelectedQuery: ((rq: SearchQueryTest) => void);
}

interface SearchQueryTest{
    id: string;
    search_id: string;
    search_term: string;
}

export default function TestSetList({   getRandomQuestions }: RandomQuestionsProps) {



    return (
        <div>
            <div>
                <button onClick={getRandomQuestions} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Refresh</button>
            </div>
                    <div className="my-4">
                <div className=""><strong>Random Questions</strong></div>
            </div>
            </div>
        );
}

