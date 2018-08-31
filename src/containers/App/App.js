import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard } from '../../actions/index.js';
import './App.css';
import { currentMovieCategoryFetch } from '../../helpers.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import { Route, Switch } from 'react-router-dom';
import UserLogin from '../../components/userLogin/UserLogin.js';
import UserSignup from '../../components/userSignup/UserSignup';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
  }

  componentDidMount = async () => {
    const data = 'now_playing';
    this.setCurrentMovieCategoryGlobalState(data);
  };

  setCurrentMovieCategoryGlobalState = async currentMovieData => {
    const data = await currentMovieCategoryFetch(currentMovieData);
    this.props.makeCards(data);
  };

  setFavoritesState = () => {
    this.setState({
      clicked: true
    });
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
          <button onClick={() => this.setFavoritesState()}>
            View Favorites
          </button>
        </header>
        <main>
          <Route
            path="/"
            render={() => {
              return <CardsContainer clicked={this.state.clicked} />;
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
