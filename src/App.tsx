import '@aws-amplify/ui-react/styles.css';
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import React, { useEffect } from 'react';
import Freestyle from './components/freestyle/Freestyle'; // Import the 'Freestyle' component
import SearchClientDemo from './components/searchClientDemo/SearchClientDemo';
import SearchHybrid from './components/searchHybrid/searchHybrid';
import TestAPIConnection from './components/testAPIConnection/TestAPIConnection';
import SearchFullText from './components/searchFullText/SearchFullText';
import TestFuncConnection from './components/testFuncConnection/TestFuncConnection';
import CompletionSuggestor from './components/completionSuggestor/CompletionSuggestor';


function App() {
  const [, setConsentGiven] = React.useState<boolean>(false);

  useEffect(() => {
    setConsentGiven(localStorage.getItem('consentGiven') === 'true');
  }
  , []);


return (
    <div className="">
      <Navbar  />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="freestyle" element={<Freestyle />} /> 
        <Route path="searchClientDemo" element={<SearchClientDemo />} />
        <Route path="searchHybrid" element={<SearchHybrid />} />
        <Route path="testAPIConnection" element={<TestAPIConnection />} />
        <Route path="searchFullText" element={<SearchFullText />} />
        <Route path="testFuncConnection" element={<TestFuncConnection />} />
        <Route path="completionSuggestor" element={<CompletionSuggestor />} />
      </Routes>
    </div>
  );
}

export default App;
