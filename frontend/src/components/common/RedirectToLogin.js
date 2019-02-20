import React, { Component } from 'react'
import { withRouter,Redirect } from 'react-router-dom';
import urls from '../../helpers/URLs';

export class RedirectToLogin extends Component {
  render() {
    return (
        this.props.location.pathname!==urls.login ? 
        <Redirect to={urls.login}/>
        :
        <div></div>
    )
  }
}

export default withRouter(RedirectToLogin)
