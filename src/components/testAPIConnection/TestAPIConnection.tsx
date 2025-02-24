import { useState } from 'react';
const uri = import.meta.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function TestAPIConnection() {
    const [data, setData] = useState('');

    const getData = async () => {
        const raw = await fetch(`${uri}/search`);
        const text = await raw.text();
        setData(text);
    };

    // useEffect(() => {
    //     getData();
    // }, []);

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