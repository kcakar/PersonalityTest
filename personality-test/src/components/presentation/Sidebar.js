import React from 'react';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

const WebSidebar = () => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible>
      <Menu.Item as='a'>
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='gamepad' />
        Test
      </Menu.Item>
    </Sidebar>
  </Sidebar.Pushable>
)

export default WebSidebar
