import { useEffect,  useState } from 'react';
import axios from 'axios';
import TestSetList from './TestSetList';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';


 interface Source {
    fragmentTitle: string;
    shortDescription: string;
    uuid: string;
    faqShortAnswer: string;
    resultType: string;
    _score: number;
}
 
interface SearchQueryTest{
    id: string;
    search_id: string;
    search_term: string;
    result_quality: string;
    assessed:string;
}

export default  function ManualReview() {
    const [queryNameState, setQueryNameState] = useState<string>('boosting');
    const [indexNameState, setIndexNameState] = useState<string>('dummy_index_v2');
    const [docs,setDocs ] = useState<Source[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Source | null>(null);
    const [searchTermState, setSearchTermState] = useState<string>('');
    const [resultTextState, setResultTextState] = useState<string>('No document selected');
    const [commentsState, setCommentsState] = useState<string>('');
    const [ ,setCompletedAssessments] = useState<string[]>([]);
    const [searchQueryTests, setSearchQueryTests] = useState<SearchQueryTest[]>([]);
    const [isInterestingState, setIsInterestingState] = useState<string>('');
    const [preferredOrderState, setPreferredOrderState] = useState<number[]>([]);

    const getSearchQueryTestSet = async () => {
        const { data } = await  axios.get(`${elasticsearchProxyUri}/GetSearchQueryTestSet`);
        setSearchQueryTests(data);
    }

    useEffect(() => {
        getSearchQueryTestSet();
    }, []);
    
    
    const filterSearch = async (eTargetValue: string) => {
        setSearchTermState(eTargetValue);
        setDocs([]);
        const query = {
            searchTerm: eTargetValue,
            queryName: queryNameState, 
        }
        axios.post(`${elasticsearchProxyUri}/${indexNameState}/_search`, query).then((response) => {
            console.log('response', response);
            const tmpDocs: Source[] = response.data.hits.hits ? response.data.hits.hits?.map((doc: { _source: Source }) => doc._source): [];
            const tmpScores: number[] = response.data.hits.hits ? response.data.hits.hits?.map((hit: {_score: number}) => hit._score): [];
            tmpDocs.forEach((doc, index) => {
                doc._score = tmpScores[index];
            });
            setDocs(tmpDocs);
        }).catch((error) => {
            console.error('error', error);
        });
    }


    const submitAssessment = async () => {
        const escapeSingleQuotes = (text: string) => text ? text.replace(/'/g, "''") : '';
        const timestamp = new Date().toISOString();
        const insert_date = timestamp;
        const update_date = timestamp;
        const testset_date = timestamp;
        const search_term = searchTermState ? escapeSingleQuotes(searchTermState) : ''; 
        const result_1_title  = docs[0]?.fragmentTitle ? escapeSingleQuotes(docs[0]?.fragmentTitle) : '';
        const result_1_es_score = docs[0]?._score ? docs[0]?._score : 0;
        const result_2_title = docs[1] ? escapeSingleQuotes(docs[1]?.fragmentTitle) : '';
        const result_2_es_score = docs[1] ? docs[1]._score : 0;
        const result_3_title = docs[2] ? escapeSingleQuotes(docs[2]?.fragmentTitle) : '';
        const result_3_es_score = docs[2] ? docs[2]?._score : 0;
        const is_interesting  = isInterestingState;
        const comments = commentsState ? escapeSingleQuotes(commentsState) : '';
        const sql = `insert into tst.ManualReviews values ('${insert_date}','${update_date}','${testset_date}','${search_term}','${result_1_title}','${result_1_title}','${result_1_title}','${is_interesting}','${comments}')`;
        

        const body = {
            search_term,
            result_1_title,
            result_1_es_score,
            result_2_title,
            result_2_es_score,
            result_3_title,
            result_3_es_score,
            comments, 
            sql 
                };

        axios.post(`${elasticsearchProxyUri}/submitAssessment`, body).then((response) => {
            console.log('response', response);
            setResultTextState('Assessment submitted');
            setDocs([]);
            setSelectedDocument(null);
            setSearchTermState('');
            setCommentsState('');
        }).catch((error) => {
            console.error('error', error);
        });

        axios.get(`${elasticsearchProxyUri}/getAssessments`, {}).then((response) => {
            setCompletedAssessments(response.data ? response.data.map((doc: { search_term: string }) => doc.search_term): []);
        }).catch((error) => {
            console.error('error', error);
        });

        await getSearchQueryTestSet();

    }

    const updatePreferredOrderState = (index: number) => {
        const tmpPreferredOrder = [...preferredOrderState];
        if (!tmpPreferredOrder.includes(index + 1)) {
            tmpPreferredOrder.push(index + 1);
            setPreferredOrderState(tmpPreferredOrder);
        }
    }

    const handleSearch = () => {
        if (searchTermState === '') {
            setResultTextState('No search term entered');
            return;
        }

        if(docs.length === 0) {
            setResultTextState(`Found ${docs.length} results. -> Start semantic search using '${searchTermState}  and return the results here.`);
        }
        else {
            setResultTextState(`Found ${docs.length} results but none selected. -> Start semantic search using '${searchTermState}' and return the results here.`);
        }
        
    };

    return (
        <div>
             {!searchQueryTests ? <div>
                <h1>Loading...</h1>
                <div>Loading /GetSearchQueryTestSet from API...</div>
                <div>API may be hybernating. Try refreshing the page if stuck here.</div>
             </div> : 
            <div className="flex h-screen">
                <div className="w-2/3 border-r border-gray-300 p-4">
                    <div className="mb-4 flex items-center">
                        <input
                            type="text"
                            value={searchTermState}
                            onChange={(e) => filterSearch(e.target.value)}
                            placeholder="Type eg 'payment'"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <select className="p-2 border border-gray-300 rounded" onChange={(e) => setQueryNameState(e.target.value)}>
                        <option value="boosting">Boosting</option>
                        <option value="baseline">Baseline</option>
                        <option value="semantic">Semantic</option>
                        </select>
                        <select className="p-2 border border-gray-300 rounded" onChange={(e) => setIndexNameState(e.target.value)}>
                        <option value="dummy_index_v2">dummy_index_v2</option>
                        <option value="dummy_index">dummy_index</option>
                        </select>
                            <button
                                onClick={() => {
                                    setSearchTermState('');
                                    setSelectedDocument(null);
                                    setResultTextState('No document selected');
                                }}
                                className="ml-2 p-2 bg-red-500 text-white rounded"
                            >
                                X
                            </button>
                        <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
                            Search
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {docs?.map((doc: Source, index: number) => (
                            <div className="flex items-center space-x-2" key={index}>
                                <button id={"preferredOrderButton" + index.toString()} className="p-1 bg-blue-500 text-white text-sm"
                                    onClick={() => updatePreferredOrderState(index)}
                                >
                                    {preferredOrderState.indexOf(index + 1) + 1 || ' '}
                                </button>
                                <li
                                    onClick={() => setSelectedDocument(doc)}
                                    className="cursor-pointer p-2 hover:bg-gray-100 rounded flex-1"
                                >
                                    {doc?.fragmentTitle || ''}
                                </li>
                            </div>
                        ))}
                    </ul>
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold my-4">Assessment</h2>
                        <div>
                            <label>Comments</label>
                            <textarea
                                value={commentsState}
                                onChange={(e) => setCommentsState(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex">
                            <input
                                type="checkbox"
                                checked={isInterestingState === 'Yes'}
                                onChange={(e) => setIsInterestingState(e.target.checked ? 'Yes' : 'No')}
                                className="border"
                                />
                                <label className="mx-2">Is Interesting?</label>
                        </div>

                        <button
                            onClick={() => submitAssessment()}
                            className="mt-4 p-2 bg-blue-500 text-white rounded"
            
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="w-1/3 p-4">
                    {selectedDocument ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{selectedDocument?.fragmentTitle}</h2>
                            <p>{selectedDocument?.faqShortAnswer}</p>
                        </div>
                    ) : (
                        <p>{resultTextState}</p>
                    )}
                    <TestSetList searchQueryTests={searchQueryTests} filterSearch={filterSearch} getRandomQuestions={getSearchQueryTestSet} />
                </div>
            </div>
            }
        </div>
    );
}

