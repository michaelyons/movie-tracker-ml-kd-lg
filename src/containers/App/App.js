import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard } from '../../actions/index.js';
import './App.css';
import {
  currentMovieCategoryFetch,
  viewFavoritesFetchCall
} from '../../helpers.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import { Route, Switch } from 'react-router-dom';
import UserLogin from '../../components/userLogin/UserLogin.js';
import UserSignup from '../../components/userSignup/UserSignup';
import { userInfo } from 'os';

class App extends Component {
  componentDidMount = async () => {
    const data = 'now_playing';
    this.setCurrentMovieCategoryGlobalState(data);
  };

  setCurrentMovieCategoryGlobalState = async currentMovieData => {
    const data = await currentMovieCategoryFetch(currentMovieData);
    this.props.makeCards(data);
  };

  viewFavoritesPage = async () => {
    const user_id = this.props.id.data.id;
    console.log(user_id);
    const url = `http://localhost:3000/api/users/${user_id}/favorites`;
    const userFavoritesData = await viewFavoritesFetchCall(url);
    console.log(userFavoritesData);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* {this.props.loggedInUser !== {} && 
            <h1 className='header-name'>{this.props.loggedInUser.loginUserReducer.data}</h1>
          } */}
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
          <button onClick={() => this.viewFavoritesPage()}>
            View Favorites
          </button>
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

const mapStateToProps = state => ({
  loggedInUser: state,
  id: state.loginUserReducer
});

const mapDispatchToProps = dispatch => ({
  makeCards: movieArray => dispatch(movieCard(movieArray))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
