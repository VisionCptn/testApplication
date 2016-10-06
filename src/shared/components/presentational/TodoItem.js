import React, { PropTypes } from 'react';

export default function TodoItem({ editable, onDelete, onEdit, children }) {
  return (
    <div>
      {children}
      {editable &&
        <span>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={onDelete}>Remove</button>
          <button className="mdl-button mdl-js-button mdl-button--raised" onClick={onEdit}>Edit</button>
        </span>
      }
    </div>
  );
}

TodoItem.propTypes = {
  editable: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit:   PropTypes.func,
  children: PropTypes.any,
};

TodoItem.defaultProps = {
  editable: false,
  onDelete: () => {},
  onEdit:   () => {},
};
