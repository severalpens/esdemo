import  { useState, useEffect } from 'react';

function TestSwaConnection() {
  const [data, setData] = useState('');

  useEffect(() => {
    (async function () {
      const { text } = await( await fetch(`/api/getstring`)).json();
      setData(text);
    })();
  });

  return (
    <div>
    {data}
    </div>
);
}

export default TestSwaConnection;