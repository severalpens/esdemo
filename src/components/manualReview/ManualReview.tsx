import { useEffect, useState } from 'react';
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

interface SearchQueryTest {
    id: string;
    search_id: string;
    search_term: string;
    result_quality: string;
    assessed: string;
}

export default function ManualReview() {
    const [queryNameState, setQueryNameState] = useState<string>('boosting');
    const [indexNameState, setIndexNameState] = useState<string>('dummy_index_v2');
    const [docs, setDocs] = useState<Source[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Source | null>(null);
    const [searchTermState, setSearchTermState] = useState<string>('');
    const [resultTextState, setResultTextState] = useState<string>('No document selected');
    const [commentsState, setCommentsState] = useState<string>('');
    const [, setCompletedAssessments] = useState<string[]>([]);
    const [searchQueryTests, setSearchQueryTests] = useState<SearchQueryTest[]>([]);
    const [isInterestingState, setIsInterestingState] = useState<string>('');
    const [preferredOrderState, setPreferredOrderState] = useState<number[]>([]);

    useEffect(() => {
        getSearchQueryTestSet();
    }, []);

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
        const escapeSingleQuotes = (text: string) => text ? text.replace(/'/g, "''") : '';
        const timestamp = new Date().toISOString();
        const insert_date = timestamp;
        const update_date = timestamp;
        const testset_date = timestamp;
        const search_term = searchTermState ? escapeSingleQuotes(searchTermState) : '';
        const result_1_title = docs[0]?.fragmentTitle ? escapeSingleQuotes(docs[0]?.fragmentTitle) : '';
        const result_1_es_score = docs[0]?._score || 0;
        const result_2_title = docs[1] ? escapeSingleQuotes(docs[1]?.fragmentTitle) : '';
        const result_2_es_score = docs[1]?._score || 0;
        const result_3_title = docs[2] ? escapeSingleQuotes(docs[2]?.fragmentTitle) : '';
        const result_3_es_score = docs[2]?._score || 0;
        const is_interesting = isInterestingState;
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

        try {
            await axios.post(`${elasticsearchProxyUri}/submitAssessment`, body);
            setResultTextState('Assessment submitted');
            resetForm();
        } catch (error) {
            console.error('error', error);
        }

        try {
            const response = await axios.get(`${elasticsearchProxyUri}/getAssessments`);
            setCompletedAssessments(response.data ? response.data.map((doc: { search_term: string }) => doc.search_term) : []);
        } catch (error) {
            console.error('error', error);
        }

        await getSearchQueryTestSet();
    };

    const resetForm = () => {
        setDocs([]);
        setSelectedDocument(null);
        setSearchTermState('');
        setCommentsState('');
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
                            setSearchTermState={setSearchTermState}
                            filterSearch={filterSearch}
                            setQueryNameState={setQueryNameState}
                            setIndexNameState={setIndexNameState}
                            resetForm={resetForm}
                            handleSearch={handleSearch}
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
                            isInterestingState={isInterestingState}
                            setIsInterestingState={setIsInterestingState}
                            submitAssessment={submitAssessment}
                        />
                    </div>
                    <div className="w-1/3 p-4">
                        {selectedDocument ? (
                            <DocumentDetails selectedDocument={selectedDocument} />
                        ) : (
                            <p>{resultTextState}</p>
                        )}
                        <TestSetList searchQueryTests={searchQueryTests} filterSearch={filterSearch} getRandomQuestions={getSearchQueryTestSet} />
                    </div>
                </div>
            )}
        </div>
    );
}

interface SearchBarProps {
    searchTermState: string;
    setSearchTermState: React.Dispatch<React.SetStateAction<string>>;
    filterSearch: (eTargetValue: string) => void;
    setQueryNameState: React.Dispatch<React.SetStateAction<string>>;
    setIndexNameState: React.Dispatch<React.SetStateAction<string>>;
    resetForm: () => void;
    handleSearch: () => void;
}

const SearchBar = ({ searchTermState, setSearchTermState, filterSearch, setQueryNameState, setIndexNameState, resetForm, handleSearch }: SearchBarProps) => (
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
            onClick={resetForm}
            className="ml-2 p-2 bg-red-500 text-white rounded"
        >
            X
        </button>
        <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
            Search
        </button>
    </div>
);

const DocumentList = ({ docs, setSelectedDocument, preferredOrderState, updatePreferredOrderState }: { docs: Source[], setSelectedDocument: React.Dispatch<React.SetStateAction<Source | null>>, preferredOrderState: number[], updatePreferredOrderState: (index: number) => void }) => (
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
);

const Assessment = ({ commentsState, setCommentsState, isInterestingState, setIsInterestingState, submitAssessment }: { commentsState: string, setCommentsState: React.Dispatch<React.SetStateAction<string>>, isInterestingState: string, setIsInterestingState: React.Dispatch<React.SetStateAction<string>>, submitAssessment: () => void }) => (
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
            onClick={submitAssessment}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
            Submit
        </button>
    </div>
);

const DocumentDetails = ({ selectedDocument }: { selectedDocument: Source | null }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4">{selectedDocument?.fragmentTitle}</h2>
        <p>{selectedDocument?.faqShortAnswer}</p>
    </div>
);

