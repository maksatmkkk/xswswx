import React, { Component } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { GiGearHammer } from 'react-icons/gi';
import Input from './components/Input';
import Buttton from './components/Buttton';
import Switcher from './components/Switcher';
import Clear from './components/Clear';
import Edit from './components/Edit';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTodos: [],
      newTodoTitle: '',
      newDescription: '',
      completedTodos: [],
      isCompletedScreen: false,
      isEditing: false,
      editedTodoId: null,
      editedTodoTitle: '',
      editedTodoDescription: '',
    };
  }

  handleAddNewToDo = () => {
    const { newTodoTitle, newDescription, allTodos } = this.state;

    const newToDoObj = {
      id: Date.now(), // Уникальный идентификатор для каждой задачи
      title: newTodoTitle,
      description: newDescription,
    };

    const updatedTodoArr = [...allTodos, newToDoObj];

    this.setState({ allTodos: updatedTodoArr });
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    this.setState({ newDescription: '', newTodoTitle: '' });
  };

  componentDidMount() {
    const savedTodos = JSON.parse(localStorage.getItem('todolist'));
    const savedCompletedToDos = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedTodos) {
      this.setState({ allTodos: savedTodos });
    }

    if (savedCompletedToDos) {
      this.setState({ completedTodos: savedCompletedToDos });
    }
  }

  handleToDoDelete = (index) => {
    const { allTodos } = this.state;
    const reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodos));
    this.setState({ allTodos: reducedTodos });
  };

  handleCompletedTodoDelete = (index) => {
    const { completedTodos } = this.state;
    const reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedCompletedTodos));
    this.setState({ completedTodos: reducedCompletedTodos });
  };

  handleClear = () => {
    localStorage.removeItem('todolist');
    localStorage.removeItem('completedTodos');
    this.setState({ allTodos: [], completedTodos: [] });
  };

  handleComplete = (index) => {
    const { allTodos, completedTodos } = this.state;
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const hh = date.getHours();
    const minutes = date.getMinutes();
    const ss = date.getSeconds();
    const finalDate = dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    const filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    const updatedCompletedList = [...completedTodos, filteredTodo];

    this.setState({ completedTodos: updatedCompletedList });
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedList));

    this.handleToDoDelete(index);
  };

  handleEditTodo = (editedTodoId) => {
    const todoToEdit = this.state.allTodos.find((todo) => todo.id === editedTodoId);

    if (todoToEdit) {
      this.setState({
        isEditing: true,
        editedTodoId: editedTodoId,
        editedTodoTitle: todoToEdit.title,
        editedTodoDescription: todoToEdit.description,
      });
    }
  };

  handleSaveEditedTodo = () => {
    const { allTodos, editedTodoId, editedTodoTitle, editedTodoDescription } = this.state;

    const updatedTodos = allTodos.map((todo) =>
      todo.id === editedTodoId
        ? { ...todo, title: editedTodoTitle, description: editedTodoDescription }
        : todo
    );

    this.setState({
      allTodos: updatedTodos,
      isEditing: false,
      editedTodoId: null,
      editedTodoTitle: '',
      editedTodoDescription: '',
    });
  };

  render() {
    const {
      newTodoTitle,
      newDescription,
      allTodos,
      completedTodos,
      isCompletedScreen,
      isEditing,
      editedTodoId,
      editedTodoTitle,
      editedTodoDescription,
    } = this.state;

    return (
      <div className="App">
        <h1>My Todos</h1>

        <div className="todo-wrapper">
          <div className="todo-input">
            <Input
              value={newTodoTitle}
              setValue={(title) => this.setState({ newTodoTitle: title })}
              name={'Title'}
              description={"What's the title of your To Do?"}
            />
            <Input
              value={newDescription}
              setValue={(description) => this.setState({ newDescription: description })}
              name={'Description'}
              description={"What's the description of your To Do?"}
            />
            <Buttton onClick={this.handleAddNewToDo} />
          </div>
          <Clear handleClear={this.handleClear} />
          <Switcher
            isCompleteScreen={isCompletedScreen}
            setIsCompleteScreen={(screen) => this.setState({ isCompletedScreen: screen })}
          />
          <div className="todo-list">
            {isCompletedScreen === false &&
              allTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      title="Delete?"
                      className="icon"
                      onClick={() => this.handleToDoDelete(index)}
                    />
                    <BsCheckLg
                      title="Completed?"
                      className="check-icon"
                      onClick={() => this.handleComplete(index)}
                    />
                    {isEditing && editedTodoId === item.id && (
                      <Edit
                        isEditing={isEditing}
                        editedTodoId={editedTodoId}
                        editedTodoTitle={editedTodoTitle}
                        editedTodoDescription={editedTodoDescription}
                        setEditedTodoTitle={(title) => this.setState({ editedTodoTitle: title })}
                        setEditedTodoDescription={(description) =>
                          this.setState({ editedTodoDescription: description })
                        }
                        handleSaveEditedTodo={this.handleSaveEditedTodo}
                      />
                    )}
                    <GiGearHammer
                      onClick={() => this.handleEditTodo(item.id)}
                      title="Edit"
                      className="icon-edit"
                    />
                  </div>
                </div>
              ))}
            {isCompletedScreen === true &&
              completedTodos.map((item, index) => (
                <Edit
                  key={index}
                  index={index}
                  item={item}
                  handleCompletedTodoDelete={this.handleCompletedTodoDelete}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
