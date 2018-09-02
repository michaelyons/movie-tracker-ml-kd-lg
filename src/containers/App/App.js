import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard } from '../../actions/index.js';
import './App.css';
import { currentMovieCategoryFetch } from '../../helpers.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import { Link, NavLink, Route, Switch, Redirect } from 'react-router-dom';
import UserLogin from '../userLogin/UserLogin';
import UserSignup from '../../components/userSignup/UserSignup';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      cardGenre: ''
    };
  }

  componentDidMount = async () => {
    const data = 'now_playing';
    this.setCurrentMovieCategoryGlobalState(data);
  };

  setCurrentMovieCategoryGlobalState = async currentMovieData => {
    const data = await currentMovieCategoryFetch(currentMovieData);
    console.log(data)
    this.props.makeCards(data);
  };

  setFavoriteState = () => {
    this.setState({
      clicked: true
    });
  };
    // this.setCurrentMovieCategoryGlobalState(value)

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MovieTracker</h1>
          <Switch>
            <Route
              path="/login"
              render={({match}) => {
                return( 
                  <div>
                    <UserLogin />
                  </div>
                )
              }}
            />
            <Route
              path="/signup"
              render={() => {
                return( 
                  <div>
                    <UserSignup />
                  </div>
                )
              }}
            />
            <NavLink to="/favorites">
              <button 
                value="favorites" 
                onClick={() => this.setFavoriteState()}>
                  View Favorites
              </button>
            </NavLink>
            <NavLink to="/now_playing">
              <button
                value="now_playing" 
                onClick={() => this.setDisplayedState()}>
                  Now Playing
              </button>
            </NavLink>
  {          // <NavLink to="/popular">
            //   <button 
            //     value="popular"
            //     onClick={() => this.setDisplayedState()}>
            //       Most Popular
            //   </button>
            // </NavLink>
          }
          </Switch>
        </header>
        <main>
          <aside>
            <Link to="/login" replace={true} className="login-nav">Log In</Link>
            or
            <Link to="/signup" replace={true} className="signup-nav">Sign Up</Link>
          </aside>
          <Route
            exact path="/"
            render={() => {
              return <CardsContainer clicked={this.state.clicked} />;
            }}
          />
          <Redirect to='/' />
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
