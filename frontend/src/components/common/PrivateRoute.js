import React from 'react'
import {Route,Redirect } from 'react-router-dom';
import urls from '../../helpers/URLs';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route exact {...rest} render={
        props =>{
            return rest.isAuthenticated ? (
                <Component {...props} />
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
