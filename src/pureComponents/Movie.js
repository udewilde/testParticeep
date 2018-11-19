import React from 'react';
import Ratings from './Ratings';


//Presenting the information inside a movie card
const Movie = ({ title, category, onRemove, likes, dislikes, changeLikes, id }) => (
  <div className="movie-card">
    <div className="movie-title">
      {title}
    </div>
    <div className="movie-category">
      {category}
    </div>
    <Ratings 
      likes={likes} 
      dislikes={dislikes} 
      changeLikes={changeLikes} 
      id={id} 
    />
    <button className="movie-delete" onClick={onRemove}>
      Supprimer
    </button>
  </div>
);

export default Movie
