import React, { PropTypes }   from 'react';
import { connect }            from 'react-redux';
import find                   from 'lodash/find';

import fetchData              from 'lib/fetchData';
import {
  TodosForm, TodosView,
}                             from './presentational';
import * as todoActions       from 'redux/todo/actions';
import {
  isEditable, computeTodos,
}                             from 'redux/todo/selectors';

@fetchData((state, dispatch) => dispatch(todoActions.loadTodos()))
@connect(state => ({
  todos:    computeTodos(state), // eslint-disable-line no-multi-spaces
  editable: isEditable(state),
}),
  todoActions
)
export default class Todos extends React.Component {
  static propTypes = {
    todos:      PropTypes.array.isRequired,
    editTodo:   PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired,
    editable:   PropTypes.bool.isRequired,
  };

  static defaultProps = {
    todos:    [],
    editable: false,
  };

  handleDelete = (id) => {
    this.props.deleteTodo(id);
  };

  handleEdit = (id) => {
    const currentVal = find(this.props.todos, ['id', id]).text;

    // For a cutting edge UX
    const text = window.prompt('', currentVal); // eslint-disable-line no-alert

    if (text !== currentVal) {
      this.props.editTodo(id, text);
    }
  };

  handleSubmit = (node, user) => {
    this.props.createTodo(node.value, user);
    node.value = ''; // eslint-disable-line no-param-reassign
  };

  render() {
    const { editable, todos } = this.props;

    return (
      <div id="todo-list">
        {editable && <TodosForm handleSubmit={this.handleSubmit} />}
        <TodosView
          todos={todos}
          editable={editable}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />


      </div>
    );
  }
}
