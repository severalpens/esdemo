import { useState } from 'react';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';

export default function RerunAutoTests() {
    const [testState, setTestState] = useState<string>("");

    const runTests = () => {
        const eventSource = new EventSource(`${elasticsearchProxyUri}/regenerateAutomatedTestResults?pd=asdf`);
        
        eventSource.onmessage = (event) => {
            setTestState(prevState => prevState + '\n' + event.data);
        };

        eventSource.onerror = (error) => {
            console.error('error', error);
            eventSource.close();
        };
    };

    const handleRunTestsClick = () => {
        if (window.confirm('Are you sure you want to regenerate automated test results?')) {
            runTests();
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Re-run Auto Tests</h1>
            <div className="m-8">
                <button onClick={handleRunTestsClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Run Tests
                </button>
            </div>
            <div>{testState || 'not yet run..'}</div>
        </div>
    );
}

