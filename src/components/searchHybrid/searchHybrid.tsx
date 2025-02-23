import { useState } from 'react';

interface Source {
    answer: string;
    channel: string;
    created_date: string;
    result_type: string;
    suggest: string;
    summary: string;
    title: string;
    url: string;
}

interface Hit {
    _source: Source;
}

const URI = 'https://search-elastic-7-7-1-5-7';
const READONLY_API_KEY = " ";

const SearchHybrid = () => {
    const [query, setQuery] = useState('payment');
    const [results, setResults] = useState<Source[]>([]);

    const handleSearch = async () => {
        const response = await fetch(`${URI}/main/_search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${READONLY_API_KEY}`
            },
            body: JSON.stringify({
                query: {
                    match: {
                        suggest: query
                    }
                }
            })
        });

        const data = await response.json();
        setResults(data.hits.hits.map((hit: Hit) => hit._source));
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        <h3>{result.title}</h3>
                        <p>{result.summary}</p>
                        <a href={result.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchHybrid;
