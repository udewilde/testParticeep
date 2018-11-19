import React from 'react';
import ReactSVG from 'react-svg'

//like/unlike button
const Ratings = ({ count, icon, changeLikes }) => (
  <div className="rating-thumbs">
    <div className="change-vote" onClick={changeLikes}>
      <ReactSVG svgClassName="thumb-icon" src={icon}  alt="pour"  />
    </div>
    <div className="change-vote-count">
      {//rounds to hundreds afterif number is greater than 1,000
        count < 999 
        ? count
        : <span>{(count / 1000).toFixed(1)}K</span> 
      }
    </div>
  </div>
)

export default Ratings