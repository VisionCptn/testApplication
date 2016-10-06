import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import * as authActions from 'redux/auth/actions';

@connect(state => ({ auth: state.auth }), authActions)
export default class Login extends React.Component {
  static propTypes = {
    login:  PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth:   PropTypes.shape({
      user:      PropTypes.string,
      loggingIn: PropTypes.bool,
      error:     PropTypes.bool,
    }),
  };

  componentDidUpdate() {
    if (this.props.auth.error) {
      this.refs.login.focus();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const login = this.refs.login;
    const pass = this.refs.pass;
    this.props.login(login.value, pass.value);

    login.value = pass.value = '';
  };

  render() {
    const { auth, logout } = this.props;
    const { user, error, loggingIn } = auth;

    const errorStyle = {
      color:      'red',
      marginLeft: '5px',
    };
    const inputStyle = {
      float:          'left',
      width:          '150px',
      margin:   '0 5px',
    };
    const formWidth = {
      width: '350px'
    }

    return (
      <div className="floatRight">
        {!user &&
          <form>
            <fieldset disabled={loggingIn}>
              <div style={formWidth} className="mdl-textfield mdl-js-textfield floatRight">
                <input style={inputStyle} className="mdl-textfield__input" placeholder="User name" type="text" ref="login" />
                <input style={inputStyle} className="mdl-textfield__input" type="password" placeholder="Password" ref="pass" />
                <button type="submit" value="Send" onClick={this.handleSubmit} className="mdl-button mdl-js-button mdl-button--raised LoginButton">
                  Login
                </button>
                {error &&
                  <span style={errorStyle}>Wrong user name or password.</span>
                }
              </div>
            </fieldset>
          </form>
        }
        {user &&
          <div>Hello, {user}!
            <button className="mdl-button mdl-js-button mdl-button--raised LoginButton" onClick={() => logout()}>Logout</button>
          </div>
        }
      </div>
    );
  }
}
