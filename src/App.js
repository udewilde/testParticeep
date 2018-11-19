import React, { Component } from 'react';
import './App.css';
import { movies$ } from './movies';
import ErrorMessage from './pureComponents/ErrorMessage';
import MultiSelect from './pureComponents/MultiSelect';
import MoviesList from './pureComponents/MoviesList';
import Pagination from './pureComponents/Pagination';
import Navigation from './pureComponents/Navigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      movies : [],
      moviesShown : [],
      categories: [],
      userInteractions: [],
      categoryChosen: 'all',
      itemsPerPage: 4,
      page: 1,
      error: null,
      canGoNext: true,
      canGoPrev: false
    };
  };

  componentDidMount = () => {
    movies$ // get the movies from the database and create the initial state
    .then(movies => { this.updateMovies(movies) })
    .catch(e => { this.setState({ error: e.message }) })
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { movies, categoryChosen, itemsPerPage, page, moviesShown } = this.state;
    //listen to modifications to update the movies to see
    if (movies !== prevState.movies || categoryChosen !== prevState.categoryChosen) {
      this.updateShownList(categoryChosen, movies)
    } 
    /*
      listen to pagination changes or number of movies to show
      in order to update the navigation options
    */
    const changeVue = prevState.moviesShown !== moviesShown ||
    prevState.itemsPerPage !== itemsPerPage || 
    prevState.page !== page
    //update the navigation options if need be
    if (changeVue) {
      const max = moviesShown.length;
      let canGoNext = true, canGoPrev = true
      if (page === 1) { 
        canGoPrev = false 
      }
      if (max < (page * itemsPerPage)) {
        canGoNext = false
      }
      this.setState({ canGoNext, canGoPrev })
    }
  }

  updateShownList = (categoryChosen, movies) => {
    //update the liste of movies the user is browsing
    const moviesShown = categoryChosen === 'all'
    ? movies
    : movies.filter(movie => movie.category === categoryChosen)
    this.setState({ moviesShown })
  }

  updateMovies = (movies) => {
    //update the list of movies altogether, then the movies shown
    const categories = 
      movies.map(m => m.category)
            .filter((cat, i, self) => ( self.indexOf(cat) === i ));
      
    let { categoryChosen } = this.state;
    const backToCatChoice = categories.indexOf(this.state.categoryChosen) < 0;
    if (backToCatChoice) categoryChosen = 'all';
    this.setState({ categories, movies, categoryChosen })
  };
  
  deleteMovie = (id) => {
    //delete a movie and updates the movies shown
    const { movies } = this.state;
    const updatedMovies = movies.filter(movie => movie.id !== id);
    this.updateMovies(updatedMovies)
  };

  changeCategory = (e) => {
    //update the filter for categories
    let categoryChosen = ''
    if (e.target) {
      categoryChosen = e.target.value;
    } else {
      categoryChosen = 'all';
    };
    this.setState({ categoryChosen })
  };

  determineLikeChange = (decision, existingInteraction, movie) => {
    /*
      determines the variation of likes, based on the user's previous 
      choice, if nay
    */

    let newInteraction = {};
    let newMovie = {};
    switch(decision) {
      case 'like': 
        if (!existingInteraction || existingInteraction.decision === 'neutral') {
          //clicks like first time > add
          newInteraction = {id:  movie.id, decision: 'like'};
          newMovie = Object.assign(movie, { likes: movie.likes +1 })
        } else {
          if (existingInteraction.decision === 'like') {
            //clicks like second time > unadd
            newInteraction = {id:  movie.id, decision: 'neutral'};
            newMovie = Object.assign(movie, { likes: movie.likes -1 })
          } else  {
            //clicks like had unliked >unadd && remove
            newInteraction = {id: movie.id, decision: 'like'};
            newMovie = Object.assign(movie, { likes: movie.likes +1, dislikes: movie.dislikes -1 })
          }
        }
        return { newInteraction, newMovie }
      case 'dislike': 
        if (!existingInteraction || existingInteraction.decision === 'neutral') {
          //clicks unlike first time > remove
          newInteraction = {id:  movie.id, decision: 'dislike'};
          newMovie = Object.assign(movie, { dislikes: movie.dislikes +1 })
        } else {
          if (existingInteraction.decision === 'dislike') {
            //clicks unlike second time > unremove
            newInteraction = {id:  movie.id, decision: 'neutral'};
            newMovie = Object.assign(movie, { dislikes: movie.dislikes -1 })
          } else  {
            //clicks unlike had unliked > add && unremove
            newInteraction = {id: movie.id, decision: 'dislike'};
            newMovie = Object.assign(movie, { likes: movie.likes -1, dislikes: movie.dislikes +1 })
          }
        }
        return { newInteraction, newMovie }
      default: 
        newMovie = movie
        return { existingInteraction, newMovie } 
    }
  };

  changeLikes = (id, decision) => {
    const { userInteractions, movies } = this.state;
    //gets the user's existing input for this item, if any
    const existingInteraction = userInteractions.filter(action => action.id === id)[0];
    const movie = movies.filter(movie => movie.id === id)[0]
    //sort the final interaction value and its impact on the rating
    const {newMovie, newInteraction} =  this.determineLikeChange(decision, existingInteraction, movie)
    const moviesUpdated = movies.map(movie => movie.id === id ? newMovie : movie );
    //creates the object for updating the state
    const interactionsUpdated = existingInteraction
    ? userInteractions.map(action => action.id === id ? newInteraction : action )
    : [...userInteractions, newInteraction]
    this.setState({ movies: moviesUpdated, userInteractions: interactionsUpdated })
  };

  changePagination = (e) => { this.setState({ itemsPerPage: e.target.value, page: 1 }) };

  nextPage = () => { 
    //no need to check if possible here, done on state change
    this.setState({ page: this.state.page + 1 })
  };

  prevPage = () => { 
    //no need to check if possible here, done on state change
    this.setState({ page: this.state.page - 1 })
  };

  render() {
    const { moviesShown, error, categories, categoryChosen, itemsPerPage, page, canGoNext, canGoPrev } = this.state;
    //small error message
    if (error) return <ErrorMessage error={error} />

    return (
      <div className="App">
        <div className="list-header">Liste des films</div>
        <div className="header-filters-wrapper">
          <Pagination 
            changePagination={this.changePagination} 
            max={moviesShown.length}
          />
          <MultiSelect
            categoryChosen={categoryChosen}
            categories={categories}
            changeCategory={this.changeCategory}
          />
        </div>
        <MoviesList 
          movies={moviesShown}
          itemsPerPage={itemsPerPage}
          deleteMovie={this.deleteMovie}
          changeLikes={this.changeLikes}
          page={page}
        />
        <Navigation 
          canGoNext={canGoNext}
          canGoPrev={canGoPrev}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
        />
      </div>
    );
  }
}

export default App;
