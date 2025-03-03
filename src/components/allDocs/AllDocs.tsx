import { useEffect, useState } from 'react';
import axios from 'axios';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';

interface Document {
    fragmentTitle: string;
    shortDescription: string;
    uuid: string;
    faqShortAnswer: string;
    resultType: string;
    url: string;
}


export default function AllDocs() {
    const [docs, setDocs] = useState<Document[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [resultText, setResultText] = useState<string>('No document selected');

    useEffect(() => {
        const getAllDocs = async () => {
            setSearchTerm('');
            axios.get(`${elasticsearchProxyUri}/all`).then((response) => {
                const tmpDocs: Document[] = response.data.hits.hits.map((doc: { _source: Document }) => doc._source);
                console.log('tmpDocs', tmpDocs);
                setDocs(tmpDocs);
            }).catch((error) => {
                console.error('error', error);
            });
        }
        getAllDocs();
        }, []);

        const getAllDocs2 = async () => {
            setSearchTerm('');
            axios.get(`${elasticsearchProxyUri}/all`).then((response) => {
                const tmpDocs: Document[] = response.data.hits.hits.map((doc: { _source: Document }) => doc._source);
                console.log('tmpDocs', tmpDocs);
                setDocs(tmpDocs);
            }).catch((error) => {
                console.error('error', error);
            });
        }


    const filterSearch = async (eTargetValue: string) => {
        setSearchTerm(eTargetValue);
        const query = { query: eTargetValue };

        console.log('searchTerm', eTargetValue);
        axios.post(`${elasticsearchProxyUri}/all`, query).then((response) => {
            const tmpDocs: Document[] = response.data.hits.hits.map((doc: { _source: Document }) => doc._source);
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

        if (docs.length === 0) {
            setResultText(`Found ${docs.length} results. -> Start semantic search using '${searchTerm}  and return the results here.`);
        }
        else {
            setResultText(`Found ${docs.length} results but none selected. -> Start semantic search using '${searchTerm}' and return the results here.`);
        }

    };

    return (
        <div className="flex h-screen">
            <div id="left-side-div" className="w-1/3 border-r border-gray-300 p-4">

                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => filterSearch(e.target.value)}
                        placeholder="Type eg 'payment'"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={async () => {
                            setSearchTerm('');
                            setSelectedDocument(null);
                            setResultText('No document selected');
                            await getAllDocs2();
                        }}
                        className="ml-2 p-2 bg-red-500 text-white rounded"
                    >
                        X
                    </button>
                    <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
                        Search
                    </button>
                </div>
                <div id="left-side-results-div" className="overflow-y-auto h-full">
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
            </div>
            <div className="w-2/3 p-4">
                {selectedDocument ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                        <a href={selectedDocument.url} target="_blank" rel="noreferrer"  >
                            {selectedDocument.fragmentTitle}
                            </a>
                            </h2>
                            <p>{selectedDocument.resultType}</p>
                            <br/>
                            <p>{selectedDocument.shortDescription}</p>
                            <br/>
                            <p>{selectedDocument.faqShortAnswer}</p>
                            </div>
                ) : (
                    <p>{resultText}</p>
                )}
            </div>
        </div>
    );
}

