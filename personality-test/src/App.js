import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';

import WebSidebar from './components/presentation/Sidebar';
import Intro from './components/pages/Intro';

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import Test from './components/Test'

class App extends Component {
  constructor(props){
    super(props);
    this.startTest=this.startTest.bind(this);
  }

  startTest(){

  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <WebSidebar></WebSidebar>
          </header>
            <main>
              <Route exact path='/' component={()=>(<Intro  handleNextStep={this.startTest}/>)} />
              {/* <Route exact path='/Edit/:id' component={EditStudent} />
              <Route exact path='/Edit/' component={EditStudent} />
              <Route exact path='/Add/' component={EditStudent} /> */}
            </main>
          <Test/>
        </div>
      </Router>
    );
  }
}

export default App;
