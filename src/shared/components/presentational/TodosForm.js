import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import * as authActions from 'redux/auth/actions';

@connect(state => ({ auth: state.auth }), authActions)


export default class TodosForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    auth:   PropTypes.shape({
      user:      PropTypes.string,
    }),
  };

  static defaultProps = {
    handleSubmit: () => {},
  };

  render() {

    const { auth, logout } = this.props;
    const { user, error, loggingIn } = auth;

    const { handleSubmit } = this.props;

    return (
      <div className="AddArticleWrapper">
        <textarea placeholder="Create new Article Here" className="mdl-textfield__input" type="text" rows= "3" ref="article-input"></textarea>
        <button className="mdl-button mdl-js-button mdl-button--raised" onClick={() => handleSubmit(this.refs['article-input'], user)}>
          Add Aricle
        </button>

      </div>
    );
  }
}
