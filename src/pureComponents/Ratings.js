import React from 'react';
import RatingUnique from './RatingUnique';
import thumbDown from '../thumbDown.svg'
import thumbUp from '../thumbUp.svg'

/* 
  youtube style like buttons.
  takes into account theif the user clicks twice on the same button
*/
const Ratings = ({ likes, dislikes, changeLikes, id }) => {
  const stylePlus = {
    width: `${likes / (likes + dislikes) * 100}%`,
  };

  const styleMinus = {
    width: `${dislikes / (likes + dislikes) * 100}%`
  };

  return (
    <div className="rating-wrapper">
      <div className="rating-action-container">
        <RatingUnique icon={thumbUp} count={likes} changeLikes={() => changeLikes(id, 'like')}  />
        <RatingUnique icon={thumbDown} count={dislikes} changeLikes={() => changeLikes(id, 'dislike')} />
      </div>
      <div className="rating-bar-container">
        <div className="rating-bar rating-plus" style={stylePlus}></div>
        <div className="rating-bar rating-minus" style={styleMinus}></div>
      </div>
    </div>
  )
};

export default Ratings