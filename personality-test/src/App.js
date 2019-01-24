import React, { Component } from 'react';
import WebSidebar from './components/Sidebar';

import 'semantic-ui-css/semantic.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <WebSidebar></WebSidebar>
        </header>
      </div>
    );
  }
}

export default App;
