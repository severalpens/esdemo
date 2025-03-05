import { useState } from 'react';
import axios from 'axios';

const elasticsearchProxyUri = import.meta.env.VITE_API_URL || 'https://notsominapi.azurewebsites.net';

export default function RunTests() {
    const [testState, setTestState] = useState<string>("");

    const runTests = async () => {

        axios.get(`${elasticsearchProxyUri}/runTests`).then((response) => {
            setTestState(response.data)
        }).catch((error) => {
            console.error('error', error);
        });
    }



    return (
        <div>
            <button onClick={runTests} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Run Tests
            </button>
            <div>{testState}</div>
        </div>
    );
}

