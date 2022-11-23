import './App.css';
import {BrowserRouter, Route, } from 'react-router-dom';
import LandingPage from './componets/LandingPage';
//import Detail from './componets/Detail';
import Home from './componets/Home';
import React from 'react';
import DogCreate from './componets/DogCreate';
//import CreateDog from './actions/index' ;
import Card from './componets/Card';

function App() {
  return (
    <BrowserRouter>
    <div className="App">

      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home} />
      <Route exact path='/home/' component={Card} />
      <Route path='/dogs' component={DogCreate} />
    </div>
    </BrowserRouter>
  );
}

export default App;
