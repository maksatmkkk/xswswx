import React from 'react'

const Clear = ({ handleClear }) => {
    return (
      <button onClick={handleClear} className="clear">
        Clear
      </button>
    );
  };
  
export default Clear