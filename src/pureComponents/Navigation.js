import React from 'react';

/*
  handles the navigfation of results
  buttons disabled if not possible to go
  back or forward any further
*/
const Navigation = ({ canGoPrev, prevPage, canGoNext, nextPage }) => (
  <div className="navigation-wrapper">
    <button 
      className={`nav-button ${canGoPrev ? 'active' : 'inactive'}`}
      onClick={prevPage} 
      disabled={!canGoPrev}
      type="button"
    >
      précédent
    </button>
    <button 
      disabled={!canGoNext}
      className={`nav-button ${canGoNext ? 'active' : 'inactive'}`}
      onClick={nextPage}
    >
      suivant
    </button>
  </div>
);

export default Navigation;