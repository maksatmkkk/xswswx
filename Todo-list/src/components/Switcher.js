import React, { Component } from 'react';

class Switcher extends Component {
  render() {
    const { isCompleteScreen, setIsCompleteScreen } = this.props;

    return (
      <div className="btn-area">
        <button
          className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
          onClick={() => setIsCompleteScreen(false)}
        >
          To Do
        </button>
        <button
          className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
          onClick={() => setIsCompleteScreen(true)}
        >
          Completed
        </button>
      </div>
    );
  }
}

export default Switcher;
