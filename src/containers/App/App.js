import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard } from '../../actions/index.js';
import './App.css';
import { currentMovieCategoryFetch } from '../../helpers.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import UserLogin from '../userLogin/UserLogin';
import UserSignup from '../../components/userSignup/UserSignup';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
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

  setFavoriteState = () => {
    this.setState({
      clicked: true
    });
  };

  setDisplayedState = async value => {
    console.log(value)
    this.setCurrentMovieCategoryGlobalState(value)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MovieTracker</h1>
            <NavLink to="/favorites">
              <button 
                value="favorites" 
                onClick={() => this.setFavoriteState()}>
                  View Favorites
              </button>
            </NavLink>
            <NavLink to="/">
              <button
                onClick={() => this.setDisplayedState("now_playing")}>
                  Now Playing
              </button>
            </NavLink>
            <NavLink to="/popular">
              <button 
                onClick={() => this.setDisplayedState("popular")}>
                  Popular
              </button>
            </NavLink>
            <NavLink to="/top_rated">
              <button 
                onClick={() => this.setDisplayedState("top_rated")}>
                  Top Rated
              </button>
            </NavLink>
            <NavLink to="/upcoming">
              <button 
                onClick={() => this.setDisplayedState("upcoming")}>
                  Upcoming
              </button>
            </NavLink>        </header>
        <main>
          <aside>
            <Link to="/login" className="login-nav">Log In</Link>
             -- or -- 
            <Link to="/signup" className="signup-nav">Sign Up</Link>
          </aside>
        <Switch>
            <Route
              exact path="/login"
              render={() => {
                return( 
                  <div>
                    <UserLogin />
                  </div>
                )
              }}
            />
            <Route
              exact path="/signup"
              render={() => {
                return( 
                  <div>
                    <UserSignup />
                  </div>
                )
              }}
            />
          <Route
            exact path="/"
            render={() => {
              return <CardsContainer clicked={this.state.clicked} />;
            }}
          />
          <Route exact path = '/upcoming' />
          <Route exact path = '/popular' />
          <Route exact path = '/top_rated' />
        </Switch>
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
