import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import {ToastProvider } from 'react-toast-notifications';
import { Loader,Dimmer } from 'semantic-ui-react';

//pages
import Intro from './components/pages/Test/Intro';
import Test from './components/pages/Test/Test';
import Results from './components/pages/Test/Results';
import CustomerDashboard from './components/pages/Customer/CustomerDashboard';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import Login from './components/pages/Authorization/Login';

//common stuff
import WebSidebar from './components/common/WebSidebar';
import PrivateRoute from './components/common/PrivateRoute';

//css
import 'semantic-ui-css/semantic.min.css'
import './style/App.css';

//data
import Authorization from './helpers/Authorization';

//application variables
import urls from './helpers/URLs';
const localStorageUser="enneagram-user";


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{
        jwt:"",
        isLoggedIn:false
      },
      results:{},
      visible:false
    }

    this.getResults=this.getResults.bind(this);
    this.testFinished=this.testFinished.bind(this);
    this.saveUserToLocalStore=this.saveUserToLocalStore.bind(this);
  }

  componentDidMount(){
    try{
      const localUser=JSON.parse(localStorage.getItem(localStorageUser));
      Authorization.verifyToken(localUser.jwt)
        .then(result=>
        {
          //if its okay, token was good. if its not okay, remove the token.
          if(!result.ok){
              localStorage.removeItem(localStorageUser);
          }
          else{
              localUser.isLoggedIn=true;
              this.setState({user:localUser})
          }
        }
        ).catch(err=>{
          console.log(err);
        }).finally(()=>{
          this.setState({visible:true})
        })
    }
    catch(err){
      //happens if there is no user string in the local store
      console.log(err);
      this.setState({visible:true})
    }
  }

  getResults(){
      return this.state.results;
  }

  testFinished(personality){
    const results=Object.assign({},personality);
    this.setState({results});
  }

  saveUserToLocalStore(user,redirectFunc){
    user.isLoggedIn=true;
    this.setState({user},()=>redirectFunc(user.role));
    localStorage.setItem(localStorageUser, JSON.stringify(user));
  }

  render() {
    const {isLoggedIn}=this.state.user;
    const {visible}=this.state;

    return (
      !visible?
      (<Dimmer active>
        <Loader size='massive'>Sistem hazırlanıyor</Loader>
      </Dimmer>):
      <Router>
        <ToastProvider>
          <div className="App">
            <header>
              <WebSidebar/>
            </header>
              <main>
                <Route exact path={urls.login}  render={() => <Login saveUserToLocalStore={this.saveUserToLocalStore}/>}/> 
                <PrivateRoute 
                  path={urls.intro}
                  isAuthenticated={isLoggedIn}
                  component={() => <Intro testUrl={urls.test}/>}
                />
                <PrivateRoute 
                  path={urls.test}
                  isAuthenticated={isLoggedIn}
                  component={() => <Test getQuestion={this.getQuestion} getQuestionCount={this.getQuestionCount} testFinished={this.testFinished}/>}
                />
                <PrivateRoute 
                  path={urls.results}
                  isAuthenticated={isLoggedIn}
                  component={() => <Results getResults={this.getResults}/>}
                />
                <PrivateRoute 
                  path={urls.customerPanel}
                  isAuthenticated={isLoggedIn}
                  component={() => <CustomerDashboard/>}
                />
                <PrivateRoute 
                  path={urls.adminPanel}
                  isAuthenticated={isLoggedIn}
                  component={() => <AdminDashboard user={this.state.user}/>}
                />
              </main>
          </div>
        </ToastProvider>
      </Router>
    )
  }
}

export default App;