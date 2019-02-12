import React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {Link } from 'react-router-dom';

import urls from '../../helpers/URLs';

const WebSidebar = () => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible>
      <Link to={urls.intro}>
        <Menu.Item as='span'>
          <Icon name='home' />
          Intro
        </Menu.Item>
      </Link>
      <Link to={urls.test}>
        <Menu.Item as='span'>
          <Icon name='gamepad' />
          Test
        </Menu.Item>
      </Link>
      <Link to={urls.results}>
        <Menu.Item as='span'>
          <Icon name='chart bar outline' />
          Sonuçlar
        </Menu.Item>
      </Link>
      <Link to={urls.customerPanel }>
        <Menu.Item as='span'>
          <Icon name='chess pawn' />
          Müşteri Paneli
        </Menu.Item>
      </Link>
      <Link to={urls.adminPanel }>
        <Menu.Item as='span'>
          <Icon name='chess queen' />
          Yönetici Paneli
        </Menu.Item>
      </Link>
    </Sidebar>
  </Sidebar.Pushable>
)

export default WebSidebar
