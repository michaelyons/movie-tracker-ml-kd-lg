import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard } from '../../actions/makeMovies.js';
import './App.css';
import { currentMovieCategoryFetch } from '../../helpers.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import { Route, Switch } from 'react-router-dom';
import UserLogin from '../../components/userLogin/UserLogin.js';
import UserSignup from '../../components/userSignup/UserSignup';

class App extends Component {
  componentDidMount = async () => {
    const data = 'now_playing';
    this.setCurrentMovieCategoryGlobalState(data);
  };

  setCurrentMovieCategoryGlobalState = async currentMovieData => {
    const data = await currentMovieCategoryFetch(currentMovieData);
    this.props.makeCards(data);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MovieTracker</h1>
          <Route
            path="/"
            render={() => {
              return <UserLogin />;
            }}
          />
         <Route
            path="/login"
            render={() => {
              return <UserSignup />;
            }} 
          /> 
        </header>
        <main>
          <Route
            path="/"
            render={() => {
              return <CardsContainer />;
            }}
          />
        </main>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//    state
// })

const mapDispatchToProps = dispatch => ({
  makeCards: movieArray => dispatch(movieCard(movieArray))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
