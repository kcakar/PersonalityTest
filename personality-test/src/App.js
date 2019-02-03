import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';

import WebSidebar from './components/presentation/Sidebar';
import Intro from './components/pages/Test/Intro';
import Test from './components/pages/Test/Test';
import Results from './components/pages/Test/Results';
import CustomerDashboard from './components/pages/Panel/CustomerDashboard';

import 'semantic-ui-css/semantic.min.css'
import './style/App.css';

import mockQuestions from '../src/components/mockdata/Questions'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      urls:{
        intro:"/enneagram/Test",
        test:"/enneagram/Test/Start",
        results:"/enneagram/Test/Results",
        customerPanel:"/enneagram/Management"
      },
      user:{
        id:"",
        name:""
      },
      results:{}
    }

    this.getQuestion=this.getQuestion.bind(this);
    this.getResults=this.getResults.bind(this);
    this.testFinished=this.testFinished.bind(this);
  }

  getQuestion(order){
    return mockQuestions[order-1];
  }

  getQuestionCount(){
    return mockQuestions.length;
  }

  getResults(){
      return this.state.results;
  }

  testFinished(personality){
    const results=Object.assign({},personality);
    this.setState({results});
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <WebSidebar urls={this.state.urls}></WebSidebar>
          </header>
            <main>
              <Route exact path={this.state.urls.intro} component={()=>(
                <Intro testUrl={this.state.urls.test}/>
              )}/>
              <Route exact path={this.state.urls.test} component={()=>(
                <Test getQuestion={this.getQuestion} getQuestionCount={this.getQuestionCount} testFinished={this.testFinished}/>
              )}/>
              <Route exact path={this.state.urls.results} component={()=>(
                <Results getResults={this.getResults}/>
              )}/>
              <Route exact path={this.state.urls.customerPanel} component={()=>(
                <CustomerDashboard/>
              )}/>
            </main>
        </div>
      </Router>
    );
  }
}

export default App;