import React from 'react';
import './App.css';
import Landing from './components/landing/landing';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Landing/>
      <Footer/>
    </div>
  );
}

export default App;
