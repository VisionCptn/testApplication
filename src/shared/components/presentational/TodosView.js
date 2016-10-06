import React, { PropTypes } from 'react';
import { TodoItem } from './index';


export default function TodosView({ editable, todos, handleDelete, handleEdit }) {


  return (
    <div id="todos-list">
      {
        todos.map((todo) => (
          <TodoItem
            editable={editable}
            key={todo.id}
            onDelete={() => handleDelete(todo.id)}
            onEdit={() => handleEdit(todo.id)}
          >
            <div className="demo-card-square mdl-card mdl-shadow--2dp">
              <div className="mdl-card__supporting-text">
                {todo.text}
              </div>
              <div className="mdl-card__actions mdl-card--border">
                {todo.user}
              </div>
            </div>

          </TodoItem>
          )
        )
      }
    </div>
  );
}

TodosView.propTypes = {
  todos:        PropTypes.array.isRequired,
  handleEdit:   PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  editable:     PropTypes.bool,
};

TodosView.defaultProps = {
  editable:     false,
  todos:        [],
  handleDelete: () => {},
  handleEdit:   () => {},
};
