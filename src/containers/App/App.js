import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard, userLogin } from '../../actions/index.js';
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
      loggedIn: false,
      now_playing: [],
      popular: [],
      top_rated: [],
      upcoming: []
    };
  }

  componentDidMount = async () => {
    const data = 'now_playing';
    this.setCurrentMovieCategoryGlobalState(data);
  };

  setCurrentMovieCategoryGlobalState = async currentMovieData => {
    if (this.state[currentMovieData].length) {
      this.props.makeCards(this.state[currentMovieData])
      return
    }

    const data = await currentMovieCategoryFetch(currentMovieData);
    this.props.makeCards(data);

    this.setState({ 
      [currentMovieData]: data
    })
  };

  setFavoriteState = (data) => {
    this.props.makeCards(data);
  };

  clickedIt = () => {
    this.setState({
      loggedIn: true
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.props.id.data && <div></div>}
          {this.props.id.data && 
            <div>
              <h1 className='user-name'>Welcome {this.props.id.data.name}</h1>
              <div className='user-buttons'>
                <NavLink to="/favorites">
                  <button 
                    onClick={() => this.setFavoriteState(this.props.favorite)}>
                      View Favorites
                  </button>
                </NavLink>
                <button onClick={() => this.props.logOutUser({})}>Sign Out</button>
              </div>
            </div>
          }
          <h1 className="App-title">Welcome to MovieTracker</h1>


          <NavLink to="/">
            <button
              onClick={() => this.setCurrentMovieCategoryGlobalState("now_playing")}>
                Now Playing
            </button>
          </NavLink>
          <NavLink to="/popular">
            <button 
              onClick={() => this.setCurrentMovieCategoryGlobalState("popular")}>
                Popular
            </button>
          </NavLink>
          <NavLink to="/top_rated">
            <button 
              onClick={() => this.setCurrentMovieCategoryGlobalState("top_rated")}>
                Top Rated
            </button>
          </NavLink>
          <NavLink to="/upcoming">
            <button 
              onClick={() => this.setCurrentMovieCategoryGlobalState("upcoming")}>
                Upcoming
            </button>
          </NavLink>        

          <div>
            <Route
              path="/"
              render={() => {
                return <UserLogin />;
              }}
            />
          </div>
          {/* <Route
              exact path="/signup"
              render={() => {
                return <UserSignup />;
              }}
            /> */}

        </header>
        <main>
          <Route exact path='/' component={CardsContainer} />
          <Route exact path = '/upcoming' component={CardsContainer} />
          <Route exact path = '/popular' component={CardsContainer} />
          <Route exact path = '/top_rated' component={CardsContainer} />
          <Route exact path = '/favorites' component={CardsContainer} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state,
  id: state.loginUserReducer,
  favorite: state.addFavoriteMovieReducer
});

const mapDispatchToProps = dispatch => ({
  makeCards: movieArray => dispatch(movieCard(movieArray)),
  logOutUser: user => dispatch(userLogin(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
