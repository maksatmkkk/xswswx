import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <div className="todo-input-item">
        <button
          className="primary-btn"
          type="button"
          onClick={onClick}
        >
          Add
        </button>
      </div>
    );
  }
}

export default Button;
