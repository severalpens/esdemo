import '@aws-amplify/ui-react/styles.css';
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import React, { useEffect } from 'react';
import Freestyle from './components/freestyle/Freestyle'; // Import the 'Freestyle' component
import SearchClientDemo from './components/searchClientDemo/SearchClientDemo';
import SearchHybrid from './components/searchHybrid/searchHybrid';


function App() {
  const [, setConsentGiven] = React.useState<boolean>(false);

  useEffect(() => {
    setConsentGiven(localStorage.getItem('consentGiven') === 'true');
  }
  , []);


return (
    <div className="container mx-auto font-sans">
      <Navbar  />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="freestyle" element={<Freestyle />} /> 
        <Route path="searchClientDemo" element={<SearchClientDemo />} />
        <Route path="searchHybrid" element={<SearchHybrid />} />
      </Routes>
    </div>
  );
}

export default App;
