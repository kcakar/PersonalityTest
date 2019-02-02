import React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {Link } from 'react-router-dom';

const WebSidebar = () => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible>
      <Link to="/Test/">
        <Menu.Item as='span'>
          <Icon name='home' />
          Intro
        </Menu.Item>
      </Link>
      <Link to="/Test/Start">
        <Menu.Item as='span'>
          <Icon name='gamepad' />
          Test
        </Menu.Item>
      </Link>
      <Link to="/Test/Results">
        <Menu.Item as='span'>
          <Icon name='gamepad' />
          Sonuçlar
        </Menu.Item>
      </Link>
      <Link to="/Management">
        <Menu.Item as='span'>
          <Icon name='gamepad' />
          Müşteri Paneli
        </Menu.Item>
      </Link>
    </Sidebar>
  </Sidebar.Pushable>
)

export default WebSidebar
