import React from 'react'
import {Route,Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={
        props =>{
            console.log(props)
            return rest.isAuthenticated() ? (
                <Component {...props} />
              ) : (
                    <Redirect   to={{
                                    pathname: rest.loginUrl,
                                    state: { from: props.location }}
                                }
                    />
              )
        }
      }
    />
  );

export default PrivateRoute
