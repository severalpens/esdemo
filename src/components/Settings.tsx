import React, { useState, useEffect } from 'react';

const options = [
  { 
    cluster: 'cluster1', 
    keys: ['apikey1', 'apikey2', 'userkey1'],
    indices: ['index1', 'index2', 'index3'],
  },
  { 
    cluster: 'cluster2', 
    keys: ['apikey1', 'apikey2', 'userkey1'],
    indices: ['index1', 'index2', 'index3'],
  }
];

function Settings() {
  const [cluster, setCluster] = useState(localStorage.getItem('cluster') || '');
  const [key, setKey] = useState(localStorage.getItem('key') || '');
  const [index, setIndex] = useState(localStorage.getItem('index') || '');

  useEffect(() => {
    localStorage.setItem('cluster', cluster);
  }, [cluster]);

  useEffect(() => {
    localStorage.setItem('key', key);
  }, [key]);

  useEffect(() => {
    localStorage.setItem('index', index);
  }, [index]);

  const handleClusterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCluster(e.target.value);
    setKey('');
    setIndex('');
  };

  const selectedCluster = options.find(option => option.cluster === cluster);

  return (
    <div className="border-b border-black ">
      <select value={cluster} onChange={handleClusterChange} className="p-2 mx-4 border">
        <option value="">Select Cluster</option>
        {options.map(option => (
          <option key={option.cluster} value={option.cluster}>{option.cluster}</option>
        ))}
      </select>
      <select value={key} onChange={(e) => setKey(e.target.value)} className="p-2 mx-4  border" disabled={!selectedCluster}>
        <option value="">Select Key</option>
        {selectedCluster && selectedCluster.keys.map(k => (
          <option key={k} value={k}>{k}</option>
        ))}
      </select>
      <select value={index} onChange={(e) => setIndex(e.target.value)} className="p-2 mx-4  border" disabled={!selectedCluster}>
        <option value="">Select Index</option>
        {selectedCluster && selectedCluster.indices.map(i => (
          <option key={i} value={i}>{i}</option>
        ))}
      </select>
    </div>
  );
}

export default Settings;