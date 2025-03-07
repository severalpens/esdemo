import { useState } from 'react';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';

export default function RunTests() {
    const [testState, setTestState] = useState<string>("");

    const runTests = () => {
        const eventSource = new EventSource(`${elasticsearchProxyUri}/runTests`);
        
        eventSource.onmessage = (event) => {
            setTestState(prevState => prevState + '\n' + event.data);
        };

        eventSource.onerror = (error) => {
            console.error('error', error);
            eventSource.close();
        };
    };

    return (
        <div>
            <button onClick={runTests} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Run Tests
            </button>
            <div>{testState}</div>
        </div>
    );
}

