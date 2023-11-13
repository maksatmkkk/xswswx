import React, { Component } from "react";
import { BsSave } from "react-icons/bs";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editedTodoTitle: this.props.editedTodoTitle,
      editedTodoDescription: this.props.editedTodoDescription,
    };
  }

  handleSave = () => {
    const { editedTodoId, handleSaveEditedTodo } = this.props;
    handleSaveEditedTodo(editedTodoId);
  };

  handleTitleChange = (e) => {
    const { setEditedTodoTitle } = this.props;
    setEditedTodoTitle(e.target.value);
  };

  handleDescriptionChange = (e) => {
    const { setEditedTodoDescription } = this.props;
    setEditedTodoDescription(e.target.value);
  };

  render() {
    const { editedTodoTitle, editedTodoDescription } = this.props;

    return (
      <div className="todo-list-item">
        <textarea
          type="text"
          value={editedTodoTitle}
          onChange={this.handleTitleChange}
        />
        <textarea
          value={editedTodoDescription}
          onChange={this.handleDescriptionChange}
        />
        <BsSave onClick={this.handleSave} title="Save" className="icon" />
      </div>
    );
  }
}

export default Edit;
