import React, { Component } from 'react';
import Header from './components/Header';
import OnDuty from './components/OnDuty';
import StudentQueue from './components/StudentQueue';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div id="content">   
          <OnDuty /> 
          <StudentQueue />
        </div>
      </div>
    );
  }
}

export default App;
