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

export default function AllDocs() {
    const [docs, setDocs] = useState<Source[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Source | null>(null);
    const [resultTextState, setResultTextState] = useState<string>('');

    const getAllDocs = async () => {
        setDocs([]);
        try {
            const response = await axios.post(`${elasticsearchProxyUri}/dummy_index_v2/_all`);
            const tmpDocs: Source[] = response.data.hits.hits ? response.data.hits.hits.map((doc: { _source: Source }) => doc._source) : [];
            setDocs(tmpDocs);
        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <div className="flex">
            <div id="docList" className="w-1/3 h-screen overflow-y-scroll p-4">
                <button onClick={getAllDocs} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Get All Docs</button>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Document Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docs.map((doc, index) => (
                            <tr key={index}>
                                <td
                                    onClick={() => {
                                        setSelectedDocument(doc);
                                        setResultTextState(doc.faqShortAnswer);
                                    }}
                                    className={`cursor-pointer `}
                                >
                                    <span>
                                        {doc.fragmentTitle}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div id="docDetails" className="w-2/3 p-4">
                <div className="my-4">
                    <div className=""><strong>Document Details</strong></div>
                    <div>
                        {selectedDocument && (
                            <div>
                                <div>
                                    <div>
                                        <strong>Document Title:</strong> {selectedDocument.fragmentTitle}
                                    </div>
                                    <div>
                                        <strong>Short Description:</strong> {selectedDocument.shortDescription}
                                    </div>
                                    <div>
                                        <strong>FAQ Short Answer:</strong> {selectedDocument.faqShortAnswer}
                                    </div>
                                    <div>
                                        <strong>Result Type:</strong> {selectedDocument.resultType}
                                    </div>
                                    <div>
                                        <strong>Score:</strong> {selectedDocument._score}
                                    </div>
                                </div>
                                <div>
                                    <strong>Result Text:</strong> {resultTextState}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

