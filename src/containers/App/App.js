import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard, userLogin, populateFavorites } from '../../actions/index.js';
import './App.css';
import { currentMovieCategoryFetch } from '../../helpers.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import UserLogin from '../userLogin/UserLogin';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      now_playing: [],
      popular: [],
      top_rated: [],
      upcoming: [],
      currentDisplay: ''
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
      [currentMovieData]: data,
      clicked: false,
      currentDisplay: [currentMovieData]
    })
  };

  setFavoriteState = () => {
    this.setState ({
      clicked: true
    })
    this.props.makeCards(this.props.favorite);
  };

  logout = () => {
    this.props.logOutUser({})
    this.props.clearFavorites([])
    this.setCurrentMovieCategoryGlobalState("now_playing")
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
                    onClick={() => this.setFavoriteState()}>
                      View Favorites
                  </button>
                </NavLink>
                <NavLink to='/'>
                  <button onClick={() => this.logout()}>Sign Out</button>
                </NavLink>
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
        </header>
        <main>
          <Route exact path='/' component={CardsContainer} />
          <Route exact path = '/upcoming' component={CardsContainer} />
          <Route exact path = '/popular' component={CardsContainer} />
          <Route exact path = '/top_rated' component={CardsContainer} />
          <Route exact path = '/favorites' 
            render={(props) => 
              <CardsContainer {...props} 
              clicked={this.state.clicked} 
              setFavoriteState={this.setFavoriteState}/>} 
          />
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
  logOutUser: user => dispatch(userLogin(user)),
  clearFavorites: favorite => dispatch(populateFavorites(favorite)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
