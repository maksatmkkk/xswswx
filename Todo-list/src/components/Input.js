import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { value, setValue, name, description } = this.props;

    return (
      <div className="todo-input-item">
        <label>{name}:</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={description}
        />
      </div>
    );
  }
}

export default Input;