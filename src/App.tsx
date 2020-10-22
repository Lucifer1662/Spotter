import React from 'react';
import './App.css';
import CreateRep from './CreateRep';
import PoseCounter from './PoseCounter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PoseCounter/>
        <CreateRep />
        
      </header>
    </div>
  );
}

export default App;
