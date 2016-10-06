import React, { PropTypes } from 'react';
import { Link, IndexLink }  from 'react-router';

import { Login, ErrorHandler, Todos } from 'components';


export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };



  render() {
    return (
      <div id="main-view">
        <IndexLink to="/" className="mdl-navigation__link">About</IndexLink>
        <Login />
        <ErrorHandler>
          {this.props.children}
        </ErrorHandler>
        <Todos/>
          
      </div>
    );
  }
}
