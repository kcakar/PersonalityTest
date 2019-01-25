import React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {Link } from 'react-router-dom';

const WebSidebar = () => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible>
      <Link to="/">
        <Menu.Item as='a'>
          <Icon name='home' />
        </Menu.Item>
      </Link>
      <Link to="/Test">
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Test
        </Menu.Item>
      </Link>
    </Sidebar>
  </Sidebar.Pushable>
)

export default WebSidebar
