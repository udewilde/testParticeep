import React from 'react';

/*
  simple toggle for the potential number of items to see per page
  number of items per page possible depends on how available many to see
*/
const Pagination = ({ changePagination, max }) => (
  <div className="pagination-wrapper">
    <div className="pagination-title">
      Vues par page  
    </div>
    <select onChange={changePagination}>
      <option value={4}>4</option>
      { max > 4 &&  <option value={8}>8</option>}
      { max > 8 &&  <option value={12}>12</option>}
    </select>
  </div>
)

export default Pagination