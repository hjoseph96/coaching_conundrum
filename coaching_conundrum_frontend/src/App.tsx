import React from 'react';

import './App.css';

import Navbar from './components/Navbar'
import Calendar from './components/Calendar';

function App() {
  return (
    <>
    <Navbar />
    
    <main>
      <Calendar />
    </main>
    </>
  );
}

export default App;
