import '@aws-amplify/ui-react/styles.css';
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import React, { useEffect } from 'react';
import SearchClientDemo from './components/searchClientDemo/SearchClientDemo';
import AllDocs from './components/allDocs/AllDocs';
import BaselineSearchExtra from './components/baselineSearchExtra/BaselineSearchExtra';
import AssessmentResults from './components/assessmentResults/AssessmentResults';
import RunTests from './components/runTests/RunTests';


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
        <Route path="searchClientDemo" element={<SearchClientDemo />} />
        <Route path="allDocs" element={<AllDocs/>} />
        <Route path="baselineSearchExtra" element={<BaselineSearchExtra />} />
        <Route path="assessmentResults" element={<AssessmentResults/>} />
        <Route path="runTests" element={<RunTests />} />
      </Routes>
    </div>
  );
}

export default App;
