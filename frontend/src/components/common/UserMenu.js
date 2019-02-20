import React, { Component } from 'react'
import { Label } from 'semantic-ui-react';

import ApiHelper from '../../helpers/ApiHelper';

export class UserMenu extends Component {
  state={
      isMenuVisible:false
  }

  render() {
    return (
      <aside className="user-menu">
        <span>{ApiHelper.user.name}</span>
        <Label onClick={this.props.logout} as='a' image>
            <span>Çıkış yap</span>
        </Label>
      </aside>
    )
  }
}

export default UserMenu
