import React from 'react'
import Movie from './Movie';

//iteration of movies
const MoviesList = ({ movies, deleteMovie, changeLikes, itemsPerPage, page }) => (
  <div className="movies-container">
    {//check if there are movies to present
      movies.length 
      ? movies.map((movie, i) => (
        //implement basic pagination based on page number and movies per page
        i + 1 > (page - 1) * itemsPerPage && i < itemsPerPage * page  &&
        <Movie 
          key={movie.id} 
          id={movie.id} 
          title={movie.title} 
          category={movie.category}
          likes={movie.likes}
          dislikes={movie.dislikes}
          onRemove={() => deleteMovie(movie.id)}
          changeLikes={changeLikes}
        />
      ))
      : <div>
        Pas de films à montrer
      </div>
    }
  </div>
);

export default MoviesList