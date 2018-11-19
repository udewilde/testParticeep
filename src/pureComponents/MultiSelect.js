import React from 'react';

// choice of categories, among those available from movies list
const MultiSelect = ({ categories, changeCategory}) => (
  <div className="pagination-wrapper">
    <div className="pagination-title">  
      Filtrer par catégorie
    </div>
    <select className="choose-categories" onChange={changeCategory}>
      <option value="all" >Tout</option>
      {categories.map(cat => (
        <option key={cat} value={cat} >{cat}</option>
      ))}
    </select>
  </div>
);

export default MultiSelect;