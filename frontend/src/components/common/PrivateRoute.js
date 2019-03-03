import React from 'react'
import {Route,Redirect } from 'react-router-dom';
import urls from '../../helpers/URLs';
import UserMenu from './UserMenu';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route exact {...rest} render={
        props =>{
            return rest.isAuthenticated ? (
                <div>
                  <Component {...props} />
                  {
                    rest.isAuthenticated && <UserMenu logout={rest.logout}/>
                  }
                </div>
              ) : (
                    <Redirect   to={{
                                    pathname: urls.login,
                                    state: { from: props.location }}
                                }
                    />
              )
        }
      }
    />
  );

export default PrivateRoute
