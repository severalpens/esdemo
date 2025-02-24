import { useState } from 'react';
import axios from 'axios';

const uri = "https://esdemoapi.azurewebsites.net";

function TestAPIConnection() {
    const [data, setData] = useState('');

    const getData = async () => {
        try {
            const response = await axios.get(`${uri}/search`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="p-4">
            <button 
                onClick={getData} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Get Data
            </button>
            <div className="mt-4 p-2 border rounded bg-gray-100">
                {data}
            </div>
        </div>
    );
}

export default TestAPIConnection;