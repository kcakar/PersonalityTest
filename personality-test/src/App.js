import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';

import WebSidebar from './components/presentation/Sidebar';
import Intro from './components/pages/Intro';
import Test from './components/pages/Test';
import Results from './components/pages/Results';

import 'semantic-ui-css/semantic.min.css'
import './style/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      urls:{
        test:"Test",
        results:"Results"
      },
      user:{
        id:"",
        name:""
      }
    }

    this.getQuestion=this.getQuestion.bind(this);
  }

  getQuestion(order){
    return mockQuestions[order-1];
  }

  getResults(){
      return {
        analyst:{
            architect:0,
            logician:0,
            commander:0,
            debater:0
        },
        diplomat:{
            advocate:0,
            mediator:0,
            protagonist:0,
            campaigner:0
        },
        sentinels:{
            logisticial:0,
            defender:0,
            executive:0,
            consul:0
        },
        explorer:{
            virtuoso:0,
            adventurer:0,
            entrepreneur:0,
            entertainer:0
        }
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <WebSidebar></WebSidebar>
          </header>
            <main>
              <Route exact path='/' component={()=>(
                <Intro testUrl={this.state.urls.test}/>
              )}/>
              <Route exact path={`/${this.state.urls.test}`} component={()=>(
                <Test getQuestion={this.getQuestion}/>
              )}/>
              <Route exact path={`/${this.state.urls.results}`} component={()=>(
                <Results getResults={this.getResults}/>
              )}/>
            </main>
        </div>
      </Router>
    );
  }
}

export default App;




const mockQuestions=[
  {
    text:"Which one is true",
    order:1,
    answers:[
      {
        text:"This is an answer",
        value:0
      },
      {
        text:"This is an answer2",
        value:1
      },
      {
        text:"This is an answer3",
        value:2
      },
      {
        text:"This is an answer4",
        value:3
      },
      {
        text:"This is an answer5",
        value:4
      },
    ]
  },
    {
    text:"Which one is true2",
    order:2,
    answers:[
      {
        text:"This is an answer",
        value:0
      },
      {
        text:"This is an answer2",
        value:1
      },
      {
        text:"This is an answer3",
        value:2
      },
      {
        text:"This is an answer4",
        value:3
      },
      {
        text:"This is an answer5",
        value:4
      },
    ]
  }
]