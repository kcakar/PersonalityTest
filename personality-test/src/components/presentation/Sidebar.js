import React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const WebSidebar = (props) => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible>
      <Link to={props.urls.intro}>
        <Menu.Item as='span'>
          <Icon name='home' />
          Intro
        </Menu.Item>
      </Link>
      <Link to={props.urls.test}>
        <Menu.Item as='span'>
          <Icon name='gamepad' />
          Test
        </Menu.Item>
      </Link>
      <Link to={props.urls.results}>
        <Menu.Item as='span'>
          <Icon name='gamepad' />
          Sonuçlar
        </Menu.Item>
      </Link>
      <Link to={props.urls.customerPanel }>
        <Menu.Item as='span'>
          <Icon name='gamepad' />
          Müşteri Paneli
        </Menu.Item>
      </Link>
    </Sidebar>
  </Sidebar.Pushable>
)

WebSidebar.propTypes = {
  urls:PropTypes.any.isRequired,
}

export default WebSidebar
