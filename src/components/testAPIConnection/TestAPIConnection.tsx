import React, { useState } from 'react';
import axios from 'axios';
// const apiuri = 'http://127.0.0.1:5000';
const apiuri = 'https://esdemoapi.azurewebsites.net';

const TestAPIConnection: React.FC = () => {
    const [result, setResult] = useState<string>('');

    const callAPI = async () => {
        try {
            const response = await axios.get(apiuri + '/getstring');
            setResult(response.data);
        } catch (error) {
            console.error('Error calling API', error);
            setResult('Error calling API');
        }
    };

    return (
        <div>
            <button onClick={callAPI}>Call API</button>
            {result && <p>Result: {result}</p>}
        </div>
    );
};

export default TestAPIConnection;
