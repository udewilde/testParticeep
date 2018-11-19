import React from 'react';

const ErrorMessage = ({ error }) => {return (
  //NEED TO STYLE THIS
  <div className="error-wrapper">
    <div className="error-title">
      Une erreur s'est produite
    </div>
    <div className="error-message">
      {error}
    </div>
  </div>
)};

export default ErrorMessage
