import { useEffect, useState } from 'react';
import axios from 'axios';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';

interface Source {
    fragmentTitle: string;
    shortDescription: string;
    uuid: string;
    faqShortAnswer: string;
    resultType: string;
    _score: number;
}

interface SearchQueryTest {
    id: string;
    search_id: string;
    search_term: string;
    result_quality: string;
    assessed: string;
}

interface AppAssessments{
    search_id: string;
    query_name: string;
    search_term: string;
    author_name: string;
    comments: string;
}

interface AppRevisedOrder{
    search_id: string;
    query_name: string;
    search_term: string;
    author_name: string;
    pos: number;
    fragment_title: string;
}



export default function ManualReview() {
    const [queryNameState, setQueryNameState] = useState<string>('boosting');
    const [indexNameState, setIndexNameState] = useState<string>('dummy_index_v2');
    const [docs, setDocs] = useState<Source[]>([]);
    const [selectedQuery, setSelectedQuery] = useState<SearchQueryTest | null>(null);
    const [selectedDocument, setSelectedDocument] = useState<Source | null>(null);
    const [searchTermState, setSearchTermState] = useState<string>('');
    const [resultTextState, setResultTextState] = useState<string>('');
    const [searchQueryTests, setSearchQueryTests] = useState<SearchQueryTest[]>([]);
    const [preferredOrderState, setPreferredOrderState] = useState<number[]>([]);
    const [authorState, setAuthorState] = useState<string>(() => localStorage.getItem('authorState') || '');
    const [commentsState, setCommentsState] = useState<string>('');
    const [expectedResults, setExpectedResults] = useState<string[]>([]);

    const getExpectedResults = async (search_id: string) => {
        const { data } = await axios.get(`${elasticsearchProxyUri}/GetExpectedResults?search_id=${search_id}`);
        const tmp = data.map((result: { expected_result: string }) => result.expected_result);
        setExpectedResults(tmp);
    }

    useEffect(() => {
        getSearchQueryTestSet();
    }, []);

    useEffect(() => {
        localStorage.setItem('authorState', authorState);
    }, [authorState]);

    const getSearchQueryTestSet = async () => {
        const { data } = await axios.get(`${elasticsearchProxyUri}/GetSearchQueryTestSet`);
        setSearchQueryTests(data);
    };

    const filterSearch = async (eTargetValue: string) => {
        setSearchTermState(eTargetValue);
        setDocs([]);
        const query = {
            searchTerm: eTargetValue,
            queryName: queryNameState,
        };
        try {
            const response = await axios.post(`${elasticsearchProxyUri}/${indexNameState}/_search`, query);
            const tmpDocs: Source[] = response.data.hits.hits ? response.data.hits.hits.map((doc: { _source: Source }) => doc._source) : [];
            const tmpScores: number[] = response.data.hits.hits ? response.data.hits.hits.map((hit: { _score: number }) => hit._score) : [];
            tmpDocs.forEach((doc, index) => {
                doc._score = tmpScores[index];
            });
            setDocs(tmpDocs);
        } catch (error) {
            console.error('error', error);
        }
    };

    const submitAssessment = async () => {
        const appAssessment: AppAssessments = {
            search_id: selectedQuery?.search_id || '',
            query_name: queryNameState,
            search_term: searchTermState,
            author_name: authorState,
            comments: commentsState,
        };
        const appRevisedOrder: AppRevisedOrder[] = [];
        preferredOrderState.forEach((pos) => {
            const fragment_title = docs[pos - 1]?.fragmentTitle || '';
            appRevisedOrder.push({
                search_id: selectedQuery?.search_id || '',
                query_name: queryNameState,
                search_term: searchTermState,
                author_name: authorState,
                pos,
                fragment_title,
            });
        });
        const body = {
            appAssessment,
            appRevisedOrder
        };
        try {
            await axios.post(`${elasticsearchProxyUri}/submitAssessment`, body);
            setResultTextState('Assessment submitted');
            resetForm();
        } catch (error) {
            console.error('error', error);
        }

    };

    const resetForm = () => {
        setDocs([]);
        setSelectedDocument(null);
        setSearchTermState('');
        setCommentsState('');
        setPreferredOrderState([]);
    };

    const updatePreferredOrderState = (index: number) => {
        const tmpPreferredOrder = [...preferredOrderState];
        if (!tmpPreferredOrder.includes(index + 1)) {
            tmpPreferredOrder.push(index + 1);
            setPreferredOrderState(tmpPreferredOrder);
        }
    };

    const handleSearch = () => {
        if (searchTermState === '') {
            setResultTextState('No search term entered');
            return;
        }

        if (docs.length === 0) {
            setResultTextState(`Found ${docs.length} results. -> Start semantic search using '${searchTermState}  and return the results here.`);
        } else {
            setResultTextState(`Found ${docs.length} results but none selected. -> Start semantic search using '${searchTermState}' and return the results here.`);
        }
    };

    return (
        <div>
            {!searchQueryTests ? (
                <div>
                    <h1>Loading...</h1>
                    <div>Loading /GetSearchQueryTestSet from API...</div>
                    <div>API may be hybernating. Try refreshing the page if stuck here.</div>
                </div>
            ) : (
                <div className="flex h-screen">
                    <div className="w-2/3 border-r border-gray-300 p-4">
                        <SearchBar
                            searchTermState={searchTermState}
                            authorState={authorState}
                            setAuthorState={setAuthorState}
                            filterSearch={filterSearch}
                            setQueryNameState={setQueryNameState}
                            setIndexNameState={setIndexNameState}
                            resetForm={resetForm}
                            handleSearch={handleSearch}
                            selectedQuery={selectedQuery}
                        />
                        <DocumentList
                            docs={docs}
                            setSelectedDocument={setSelectedDocument}
                            preferredOrderState={preferredOrderState}
                            updatePreferredOrderState={updatePreferredOrderState}
                        />
                        <Assessment
                            commentsState={commentsState}
                            setCommentsState={setCommentsState}
                            authorState={authorState}
                            setAuthorState={setAuthorState}
                            submitAssessment={submitAssessment}
                        />
                        {selectedDocument ? (
                            <DocumentDetails selectedDocument={selectedDocument} />
                        ) : (
                            <p>{resultTextState}</p>
                        )}
                    </div>
                    <div className="w-1/3 p-4">
                        <div>
                            {expectedResults.length > 0 && (
                                <div>
                                    <h2 className="font-bold">Expected Results</h2>
                                    <ul>
                                        {expectedResults.map((result, index) => (
                                            <li key={index}>{result}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="my-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                            <h2 className=" font-bold">Tests</h2>
                            {searchQueryTests.map((rq) => (
                                <div
                                    onClick={() => {
                                        filterSearch(rq.search_term);
                                        setSelectedQuery(rq);
                                        getExpectedResults(rq.search_id);
                                    }}
                                    className={`cursor-pointer `}
                                >{`(${rq.search_id}) ${rq.search_term}`}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface SearchBarProps {
    searchTermState: string;
    authorState: string;
    setAuthorState: React.Dispatch<React.SetStateAction<string>>;
    filterSearch: (eTargetValue: string) => void;
    setQueryNameState: React.Dispatch<React.SetStateAction<string>>;
    setIndexNameState: React.Dispatch<React.SetStateAction<string>>;
    resetForm: () => void;
    handleSearch: () => void;
    selectedQuery: SearchQueryTest | null;

}

const SearchBar = ({ searchTermState, authorState, setAuthorState, filterSearch, setQueryNameState, setIndexNameState, resetForm, handleSearch, selectedQuery }: SearchBarProps) => (
    <div className="mb-4 flex items-center">
        <span className='mr-2'>{selectedQuery?.search_id}</span>
        <input
            type="text"
            value={searchTermState}
            onChange={(e) => filterSearch(e.target.value)}
            placeholder="Type eg 'payment'"
            className="w-full p-2 border border-gray-300 rounded"
        />
        <input hidden
            type="text"
            value={authorState}
            onChange={(e) => setAuthorState(e.target.value)}
            placeholder=""
            className="w-full p-2 border border-gray-300 rounded"
        />
        <select hidden className="p-2 border border-gray-300 rounded" onChange={(e) => setQueryNameState(e.target.value)}>
            <option value="boosting">Boosting</option>
            <option value="baseline">Baseline</option>
            <option value="semantic">Semantic</option>
        </select>
        <select hidden className="p-2 border border-gray-300 rounded" onChange={(e) => setIndexNameState(e.target.value)}>
            <option value="dummy_index_v2">dummy_index_v2</option>
            <option value="dummy_index">dummy_index</option>
        </select>
        <button
            onClick={resetForm}
            className="ml-2 p-2 bg-red-500 text-white rounded"
        >
            X
        </button>
        <button hidden onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
            Search
        </button>
    </div>
);

const DocumentList = ({ docs, setSelectedDocument, preferredOrderState, updatePreferredOrderState }: { docs: Source[], setSelectedDocument: React.Dispatch<React.SetStateAction<Source | null>>, preferredOrderState: number[], updatePreferredOrderState: (index: number) => void }) => (
    <>
        <table className="w-full table-auto border-collapse">
            <thead>
                <tr>
                    <th className="border px-2 py-2 w-1/6">Preferred Position</th>
                    <th className="border px-4 py-2 w-5/6">Title</th>
                </tr>
            </thead>
            <tbody>
                {docs?.map((doc: Source, index: number) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="border px-2 py-2 text-center">
                            <button
                                id={"preferredOrderButton" + index.toString()}
                                className="p-1 bg-blue-500 border text-white text-sm rounded w-6 h-6"
                                onClick={() => updatePreferredOrderState(index)}
                            >
                                {preferredOrderState.indexOf(index + 1) + 1 || ''}
                            </button>
                        </td>
                        <td
                            className="border px-4 py-2 cursor-pointer"
                            onClick={() => setSelectedDocument(doc)}
                        >
                            {doc?.fragmentTitle || ''}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
);


const Assessment = ({ commentsState, setCommentsState, submitAssessment, setAuthorState, authorState }: { commentsState: string, setCommentsState: React.Dispatch<React.SetStateAction<string>>, authorState: string, setAuthorState: React.Dispatch<React.SetStateAction<string>>, submitAssessment: () => void }) => (
    <div className="my-2">
        <div>
            <label>Author</label>
            <input id="setAuthorInput" className="p-2 mx-2 border border-gray-300 rounded"
                onChange={(e) => setAuthorState(e.target.value)}
                value={authorState} />
        </div>
        <div>
            <label>Comments</label>
            <textarea rows={5}
                value={commentsState}
                onChange={(e) => setCommentsState(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />
        </div>
        <button
            onClick={submitAssessment}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
            Submit
        </button>
    </div>
);

const DocumentDetails = ({ selectedDocument }: { selectedDocument: Source | null }) => (
    <div>
        <h2 className="font-bold mb-4">{selectedDocument?.fragmentTitle}</h2>
        <p>{selectedDocument?.shortDescription}</p>
    </div>
);

