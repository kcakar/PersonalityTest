import React from 'react';
import PropTypes from 'prop-types';
import {  Menu ,Transition} from 'semantic-ui-react';

class AdminNavigation extends React.Component {

  constructor(props){
    super(props);
    const {tabs}=props;
    this.state = {
      visible:false,
      activeItem:tabs.users,
      tabs
    }
  }
  componentDidMount(){
    this.setState({
        visible:true,
    });
  }

  handleItemClick = (e, { name }) => 
  {
    this.setState({ activeItem: name });
    this.props.setTab(name);
  }

  render() {
      const { activeItem,tabs } = this.state

      return (
        <Transition visible={this.state.visible} animation='fade' duration={500}>
          <div className='admin-menu'>
            <Menu fluid pointing secondary>
              {Object.keys(tabs).map(
                (tabKey)=>
                  <Menu.Item 
                    name={tabs[tabKey]} 
                    key={tabKey}
                    content={tabs[tabKey]} 
                    active={activeItem === tabs[tabKey]} 
                    onClick={this.handleItemClick} 
                  />
              )}
            </Menu>
          </div>
        </Transition>
      )
    }
}

AdminNavigation.propTypes = {
    tabs:PropTypes.any.isRequired,
    setTab:PropTypes.func.isRequired,
}

export default AdminNavigation
