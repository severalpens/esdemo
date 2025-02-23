import { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState('');

    useEffect(() => {
        (async function () {
            const raw = await fetch(`/api/http_trigger?name=paul`);
            const text = await raw.text();
            setData(text);
        })();
    });

    return <div>{data}</div>;
}

export default App;