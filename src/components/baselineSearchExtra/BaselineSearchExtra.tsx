import {  useState } from 'react';
import axios from 'axios';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';

 interface Document {
    fragmentTitle: string;
    shortDescription: string;
    uuid: string;
    faqShortAnswer: string;
    resultType: string;
}

const resultQualityOptions = [
    'Bad - preferred answer not present',
    'Good - preferred answer is present but not result 1',
    'Perfect - preferred answer is present and is result 1'];


export default  function BaselineSearchExtra() {
    const [docs,setDocs ] = useState<Document[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [resultText, setResultText] = useState<string>('No document selected');
    const [resultQuality, setResultQuality] = useState<string>('');
    const [comments, setComments] = useState<string>('');

    const filterSearch = async (eTargetValue: string) => {
        setSearchTerm(eTargetValue);
        const query = {query: eTargetValue};

        console.log('searchTerm', eTargetValue);
        axios.post(`${elasticsearchProxyUri}/baseline`, query).then((response) => {
            const tmpDocs: Document[] = response.data.hits.hits.map((doc: { _source: Document }) => doc._source);
            setDocs(tmpDocs);
        }).catch((error) => {
            console.error('error', error);
        });
    }


    const submitAssessment = async () => {
        const body = {
            input_query: searchTerm,
            result1: docs[0] ? docs[0].fragmentTitle : '',
            result2: docs[1] ? docs[1].fragmentTitle : '',
            result3: docs[2] ? docs[2].fragmentTitle : '',
            resultQuality: resultQuality, 
            comments: comments
        };

        axios.post(`${elasticsearchProxyUri}/submitAssessment`, body).then((response) => {
            console.log('response', response);
            setResultText('Assessment submitted');
            setDocs([]);
            setSelectedDocument(null);
            setSearchTerm('');
            setResultQuality('');
            setComments('');
        }).catch((error) => {
            console.error('error', error);
        });
    }

    const handleSearch = () => {
        if (searchTerm === '') {
            setResultText('No search term entered');
            return;
        }

        if(docs.length === 0) {
            setResultText(`Found ${docs.length} results. -> Start semantic search using '${searchTerm}  and return the results here.`);
        }
        else {
            setResultText(`Found ${docs.length} results but none selected. -> Start semantic search using '${searchTerm}' and return the results here.`);
        }
        
    };

    return (
        <div className="flex h-screen">
            <div className="w-2/3 border-r border-gray-300 p-4">
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => filterSearch(e.target.value)}
                        placeholder="Type eg 'payment'"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedDocument(null);
                                setResultText('No document selected');
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
                            value={resultQuality}
                            onChange={(e) => setResultQuality(e.target.value)}
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
                        <label>Comments</label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
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
                    <p>{resultText}</p>
                )}
            </div>
        </div>
    );
}

