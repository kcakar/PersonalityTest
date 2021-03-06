import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import { ToastContainer,cssTransition } from 'react-toastify';
import { Loader,Dimmer } from 'semantic-ui-react';

//pages
import Test from './components/pages/Test/Test';
import Results from './components/pages/Test/Results';
import CustomerDashboard from './components/pages/Customer/CustomerDashboard';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import Login from './components/pages/Authorization/Login';
import MainPage from './components/pages/Website/MainPage';

//common stuff
// import WebSidebar from './components/common/WebSidebar';
import PrivateRoute from './components/common/PrivateRoute';

//css
import 'semantic-ui-css/semantic.min.css'
import './style/App.css';
import 'react-toastify/dist/ReactToastify.css';

//data
import Authorization from './helpers/Authorization';
import ApiHelper from './helpers/ApiHelper';

//application variables
import urls from './helpers/URLs';
const localStorageUser="triaakademi-user";

//toast settings
const toastAnimation = cssTransition({
  enter: 'toastIn',
  exit: 'toastOut',
});


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{
        isLoggedIn:false
      },
      results:{},
      visible:false
    }

    this.getResults=this.getResults.bind(this);
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
              ApiHelper.token=localUser.jwt;
              ApiHelper.user=localUser;
              this.setState({user:localUser,visible:true});
          }
        }
        ).catch(err=>{
          this.setState({visible:true})
        })
    }
    catch(err){
      //happens if there is no user string in the local store
      this.setState({visible:true})
    }
  }

  getResults(){
      return this.state.results;
  }

  saveUserToLocalStore(user,redirectFunc){
    user.isLoggedIn=true;
    ApiHelper.token=user.jwt;
    ApiHelper.user=user;
    this.setState({user},()=>redirectFunc(user.role));
    localStorage.setItem(localStorageUser, JSON.stringify(user));
  }

  logout=()=>{
    localStorage.removeItem(localStorageUser);
    this.setState({ user:{ isLoggedIn:false }, results:{}, visible:true })
  }

  render() {
    const {isLoggedIn,role,status}=this.state.user;
    const {visible}=this.state;

    return (
      !visible?
      (<Dimmer active>
        <Loader size='massive'>Sistem hazırlanıyor</Loader>
      </Dimmer>):
      <Router>
          <div className="App">
              <main>
                <Switch>
                  <Route exact path={urls.homepage} render={()=><MainPage/>} /> 
                  {/* {
                    visible && !isLoggedIn && <RedirectToLogin/>
                  } */}
                  <Route exact path={urls.login}  render={() => <Login saveUserToLocalStore={this.saveUserToLocalStore}/>}/> 

                  <PrivateRoute 
                    path={urls.test}
                    isAuthenticated={isLoggedIn&&role==="employee"}
                    logout={this.logout}
                    component={() => <Test/>}
                  />

                  <PrivateRoute 
                    path={urls.results}
                    isAuthenticated={isLoggedIn&&role==="employee"}
                    logout={this.logout}
                    component={() => <Results getResults={this.getResults}/>}
                  />

                  <PrivateRoute 
                    path={urls.customerPanel()}
                    isAuthenticated={isLoggedIn&&((role==="company" && status==="active")||role==="admin")}
                    logout={this.logout}
                    component={() => <CustomerDashboard/>}
                  />

                  <PrivateRoute 
                    path={urls.adminPanel()}
                    isAuthenticated={isLoggedIn&&role==="admin"}
                    logout={this.logout}
                    component={() => <AdminDashboard/>}
                  />

                  <Route render={()=><MainPage/>} />
                </Switch>
              </main>
              <ToastContainer autoClose={2000}  transition={toastAnimation}/>
          </div>
      </Router>
    )
  }
}

export default App;