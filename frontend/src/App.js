import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import {ToastProvider } from 'react-toast-notifications';
import { Loader } from 'semantic-ui-react';

//pages
import Intro from './components/pages/Test/Intro';
import Test from './components/pages/Test/Test';
import Results from './components/pages/Test/Results';
import CustomerDashboard from './components/pages/Customer/CustomerDashboard';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import Login from './components/pages/Authorization/Login';

//common stuff
import WebSidebar from './components/common/Sidebar';
import PrivateRoute from './components/common/PrivateRoute';

//css
import 'semantic-ui-css/semantic.min.css'
import './style/App.css';

//data
import mockQuestions from '../src/components/mockdata/Questions';
import Authorization from './helpers/Authorization';

//application variables
const localStoragePath="jwttoken";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      urls:{
        homepage:"/enneagram",
        intro:"/enneagram/Test",
        test:"/enneagram/Test/Start",
        results:"/enneagram/Test/Results",
        customerPanel:"/enneagram/Management",
        adminPanel:"/enneagram/Admin",
        login:"/enneagram/login"
      },
      user:{
        jwt:{},
        isLoggedIn:true
      },
      results:{},
      visible:false
    }

    this.getQuestion=this.getQuestion.bind(this);
    this.getResults=this.getResults.bind(this);
    this.testFinished=this.testFinished.bind(this);
    this.setJWT=this.setJWT.bind(this);
  }

  componentDidMount(){
    const userString=localStorage.getItem(localStoragePath);
    if(userString){
      const user=JSON.parse(userString);
      if(user && user.jwt && user.jwt.token){
        Authorization.verifyToken(user.jwt.token)
        .then(result=>
         {
           //if its okay, token was good. if its not okay, remove the token.
           if(!result.ok){
              localStorage.removeItem(localStoragePath);
              user.isLoggedIn=false;
              this.setState({user,visible:true})
           }
           else{
             this.setState({user,visible:true})
           }
         }
        )
      }
    }
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

  setJWT(jwt,redirectFunc){
    let {user}=this.state;
    user.jwt=jwt;
    user.isLoggedIn=true;
    this.setState({user},redirectFunc);
    localStorage.setItem(localStoragePath, JSON.stringify(user));
  }

  render() {
    const {isLoggedIn}=this.state.user;
    const {visible}=this.state;
    if(visible){

    }
    else{
      
    }

    return (
      !visible?
      <Loader></Loader>:
      <Router>
        <div className="App">
          <header>
            <WebSidebar urls={this.state.urls}></WebSidebar>
          </header>
            <main>
              <Route exact path={this.state.urls.login} component={()=>(
                <ToastProvider>
                  <Login setJWT={this.setJWT}/>
                </ToastProvider>
              )}/>
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
                <ToastProvider>
                  <CustomerDashboard/>
                </ToastProvider>
              )}/>
              <PrivateRoute 
                path={this.state.urls.adminPanel}
                isAuthenticated={isLoggedIn}
                loginUrl={this.state.urls.login}
                component={()=>(
                  <ToastProvider>
                    <AdminDashboard/>
                  </ToastProvider>
                )}>
              </PrivateRoute>
            </main>
        </div>
      </Router>
    )
  }
}

export default App;