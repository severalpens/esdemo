import {  useState } from 'react';
import axios from 'axios';
const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';
  
  interface Source {
    fragmentTitle: string;
    shortDescription: string;
    url: string;
    uuid: string;
    resultType: string;
  }
  
  interface Option {
    text: string;
    _index: string;
    _id: string;
    _score: number;
    _source: Source;
  }
  
//   interface Hit {
//     _index: string;
//     _type: string;
//     _id: string;
//     _score: number;
//     _source: Source;
//   }
  

export default  function CompletionSuggestor() {
    const [suggestions,setSuggestions ] = useState<Option[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Option | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [resultText, setResultText] = useState<string>('No document selected');

    const getSuggestions = async (eTargetValue: string) => {
        setSearchTerm(eTargetValue);
        const query = {query: eTargetValue};
        axios
        .post(`${elasticsearchProxyUri}/completionsuggestor`, query)
        .then((response) => {
            console.log('response', response.data);
            setSuggestions(response.data.suggest.autocomplete[0].options);
        })
        .catch((error) => {
            console.error('error', error);
        });
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/3 border-r border-gray-300 p-4">
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => getSuggestions(e.target.value)}
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
                </div>
                <ul className="space-y-2">
                    {suggestions.map((doc: Option, index: number) => (
                        <li
                            key={index}
                            onClick={() => setSelectedDocument(doc)}
                            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        >
                            {doc._source.fragmentTitle || ''}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-2/3 p-4">
            {selectedDocument ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{selectedDocument._source.fragmentTitle}</h2>
                        <p>{selectedDocument._source.shortDescription}</p>
                    </div>
                ) : (
                    <p>{resultText}</p>
                )}
            </div>
        </div>
    );
}

