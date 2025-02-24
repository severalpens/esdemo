import { useState, useEffect } from 'react';
const uri = process.env.NEXT_PUBLIC_API_URL || "https://esdemoapi.azurewebsites.net";

function TestAPIConnection() {
    const [data, setData] = useState('');

    useEffect(() => {
        const getData = async () => {
            const raw = await fetch(`${uri}/search`);
            const text = await raw.text();
            setData(text);
        };

        getData();
    });

    return <div>{data}</div>;
}

export default TestAPIConnection;