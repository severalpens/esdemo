import {  useState } from 'react';
import axios from 'axios';
import { clearMessages } from 'aws-amplify/in-app-messaging';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';
// const elasticsearchProxyUri = import.meta.env.VITE_API_URL;
// const elasticsearchProxyUri = '/api';

 interface Document {
    fragmentTitle: string;
    shortDescription: string;
    uuid: string;
    faqShortAnswer: string;
    resultType: string;
}


export default  function SearchClientDemo() {
    const [docs,setDocs ] = useState<Document[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [resultText, setResultText] = useState<string>('No document selected');

    const filterSearch = async (eTargetValue: string) => {
        setSearchTerm(eTargetValue);
        const query = {query: eTargetValue};

        console.log('searchTerm', eTargetValue);
        axios.post(`${elasticsearchProxyUri}/baseline`, query).then((response) => {
            let tmpDocs: Document[] = response.data.hits.hits.map((doc: any) => doc._source);
            setDocs(tmpDocs);
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
            <div className="w-1/3 border-r border-gray-300 p-4">
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
            </div>
            <div className="w-2/3 p-4">
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

