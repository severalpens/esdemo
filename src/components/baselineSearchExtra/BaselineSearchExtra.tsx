import {  useState } from 'react';
import axios from 'axios';
import RandomQuestions from '../randomQuestions/RandomQuestions';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';

 interface Document {
    fragmentTitle: string;
    shortDescription: string;
    uuid: string;
    faqShortAnswer: string;
    resultType: string;
    _score: number;
}


const resultQualityOptions = [
    'Bad - preferred answer not present',
    'Good - preferred answer is present but not result 1',
    'Perfect - preferred answer is present and is result 1'
];

const failureReasonOptions = [
    'no_relevant_document_exists',
'no_relevant_document_in_index',
'es_did_not_understand'
];


export default  function BaselineSearchExtra() {
    const [docs,setDocs ] = useState<Document[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [searchTermState, setSearchTermState] = useState<string>('');
    const [resultTextState, setResultTextState] = useState<string>('No document selected');
    const [resultQualityState, setResultQualityState] = useState<string>('');
    const [failureReasonState, setFailureReasonState] = useState<string>('');
    const [commentsState, setCommentsState] = useState<string>('');
    const [completedAssessments, setCompletedAssessments] = useState<string[]>([]);

    const filterSearch = async (eTargetValue: string) => {
        setSearchTermState(eTargetValue.trim());
        const query = {query: eTargetValue.trim()};

        console.log('searchTerm', eTargetValue);
        axios.post(`${elasticsearchProxyUri}/baseline`, query).then((response) => {
            console.log('response', response);
            const tmpDocs: Document[] = response.data.hits.hits.map((doc: { _source: Document }) => doc._source);
            const tmpScores: number[] = response.data.hits.hits.map((hit: {_score: number}) => hit._score);
            tmpDocs.forEach((doc, index) => {
                doc._score = tmpScores[index];
            });
            setDocs(tmpDocs);
        }).catch((error) => {
            console.error('error', error);
        });
    }

    const getSelectedDocumentOptionPosition = () => {
        if (selectedDocument) {
            if (selectedDocument.fragmentTitle === docs[0].fragmentTitle) {
                return 'result_1';
            } else if (selectedDocument.fragmentTitle === docs[1].fragmentTitle) {
                return 'result_2';
            } else if (selectedDocument.fragmentTitle === docs[2].fragmentTitle) {
                return 'result_3';
            }
        }
        return '';
    }


    const submitAssessment = async () => {
        const escapeSingleQuotes = (text: string) => text ? text.replace(/'/g, "''") : '';

        const search_term = searchTermState ? escapeSingleQuotes(searchTermState) : ''; 
        const result_1_title  = docs[0].fragmentTitle ? escapeSingleQuotes(docs[0].fragmentTitle) : '';
        const result_1_type = docs[0].resultType ? escapeSingleQuotes(docs[0].resultType) : '';
        const result_1_short_description = docs[0].shortDescription ? escapeSingleQuotes(docs[0].shortDescription) : '';
        const result_1_faq_short_answer = docs[0].faqShortAnswer ? escapeSingleQuotes(docs[0].faqShortAnswer) : '';
        const result_1_es_score = docs[0]._score ? docs[0]._score : 0;
        const result_2_title = docs[1] ? escapeSingleQuotes(docs[1].fragmentTitle) : '';
        const result_2_type = docs[1] ? escapeSingleQuotes(docs[1].resultType) : '';
        const result_2_short_description = docs[1] ? escapeSingleQuotes(docs[1].shortDescription) : '';
        const result_2_faq_short_answer = docs[1] ? escapeSingleQuotes(docs[1].faqShortAnswer) : '';
        const result_2_es_score = docs[1] ? docs[1]._score : 0;
        const result_3_title = docs[2] ? escapeSingleQuotes(docs[2].fragmentTitle) : '';
        const result_3_type = docs[2] ? escapeSingleQuotes(docs[2].resultType) : '';
        const result_3_short_description = docs[2] ? escapeSingleQuotes(docs[2].shortDescription) : '';
        const result_3_faq_short_answer = docs[2] ? escapeSingleQuotes(docs[2].faqShortAnswer) : '';
        const result_3_es_score = docs[2] ? docs[2]._score : 0;
        const result_quality = resultQualityState ? escapeSingleQuotes(resultQualityState) : '';
        const preferred_answer_position = getSelectedDocumentOptionPosition();
        const failure_reason = failureReasonState ? escapeSingleQuotes(failureReasonState) : '';
        const comments = commentsState ? escapeSingleQuotes(commentsState) : '';
        const sql = `insert into assessments values ('${search_term}','${result_1_title}','${result_1_type}','${result_1_short_description}','${result_1_faq_short_answer}','${result_1_es_score}','${result_2_title}','${result_2_type}','${result_2_short_description}','${result_2_faq_short_answer}','${result_2_es_score}','${result_3_title}','${result_3_type}','${result_3_short_description}','${result_3_faq_short_answer}','${result_3_es_score}','${result_quality}','${preferred_answer_position}','${failure_reason}','${comments}')`;
        

        const body = {
            search_term,
            result_1_title,
            result_1_type,
            result_1_short_description,
            result_1_faq_short_answer,
            result_1_es_score,
            result_2_title,
            result_2_type,
            result_2_short_description,
            result_2_faq_short_answer,
            result_2_es_score,
            result_3_title,
            result_3_type,
            result_3_short_description,
            result_3_faq_short_answer,
            result_3_es_score,
            result_quality,
            preferred_answer_position,
            failure_reason,
            comments, 
            sql 
                };

        axios.post(`${elasticsearchProxyUri}/submitAssessment`, body).then((response) => {
            console.log('response', response);
            setResultTextState('Assessment submitted');
            setDocs([]);
            setSelectedDocument(null);
            setSearchTermState('');
            setResultQualityState('');
            setCommentsState('');
        }).catch((error) => {
            console.error('error', error);
        });

        axios.get(`${elasticsearchProxyUri}/getAssessments`, {}).then((response) => {
            setCompletedAssessments(response.data.map((doc: { search_term: string }) => doc.search_term));
        }).catch((error) => {
            console.error('error', error);
        });

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
                    {docs.map((doc: Document, index: number) => (
                        <li
                            key={index}
                            onClick={() => setSelectedDocument(doc)}
                            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        >
                            {doc.fragmentTitle || ''}
                        </li>
                    ))}
                </ul>
                <div>
                    <h2 className="text-2xl font-bold mt-4">Assessment</h2>
                    <div>
                        <label>Result Quality</label>
                        <select
                            value={resultQualityState}
                            onChange={(e) => setResultQualityState(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select...</option>
                            {resultQualityOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Failure Reason</label>
                        <select
                            value={failureReasonState}
                            onChange={(e) => setFailureReasonState(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select...</option>
                            {failureReasonOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Comments</label>
                        <textarea
                            value={commentsState}
                            onChange={(e) => setCommentsState(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
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
                        <h2 className="text-2xl font-bold mb-4">{selectedDocument.fragmentTitle}</h2>
                        <p>{selectedDocument.faqShortAnswer}</p>
                    </div>
                ) : (
                    <p>{resultTextState}</p>
                )}
                <RandomQuestions completedAssessments={completedAssessments} filterSearch={filterSearch} />
            </div>
        </div>
    );
}

