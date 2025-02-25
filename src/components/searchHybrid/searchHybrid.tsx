import {  useState } from 'react';
import axios from 'axios';

// const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://esdemoapi.azurewebsites.net';
const elasticsearchProxyUri = '/api';

interface Document {
  _id: string;
  _ignored: Array<string>;
  _index: string;
  _score: number;
  _source: {
    answer: string;
    channel: string;
    created_date: string;
    result_type: string;
    suggest: string;
    summary: string;
    title: string;
    url: string;
  }
}


export default  function SearchClientDemo() {
    const [docs,setDocs ] = useState<Document[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [resultText, setResultText] = useState<string>('No document selected');

    const filterSearch =async (eTargetValue: string) => {
        setSearchTerm(eTargetValue);
        const response = await axios.post(`${elasticsearchProxyUri}/search`, {
            query: {
                match: {
                    title: eTargetValue,
                },
            },
        });
        console.log(response.data);
        setDocs(response.data);
    }

    const handleSearch = () => {
        if (searchTerm === '') {
            setResultText('No search term entered');
            return;
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
                            {doc._source.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-2/3 p-4">
                {selectedDocument ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{selectedDocument._source.title}</h2>
                        <p>{selectedDocument._source.answer}</p>
                    </div>
                ) : (
                    <p>{resultText}</p>
                )}
            </div>
        </div>
    );
}

