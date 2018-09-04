import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard, userLogin, resetFavorites } from '../../actions/index.js';
import './App.css';
import { currentMovieCategoryFetch } from '../../helpers.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import {  NavLink, Route } from 'react-router-dom';
import UserLogin from '../userLogin/UserLogin';

class App extends Component {
  constructor() {
    super();
    this.state = {
      test: false,
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
    this.setState({ currentDisplay: [currentMovieData] })

    if (this.state[currentMovieData].length) {
      this.props.makeCards(this.state[currentMovieData])
      return
    }

    const data = await currentMovieCategoryFetch(currentMovieData);
    this.props.makeCards(data);

    this.setState({ 
      [currentMovieData]: data,
      clicked: false,
    })
  };

  setFavoriteState = () => {
    this.setState ({ 
      clicked: true,
      currentDisplay: 'favorites'
    })
    this.props.makeCards(this.props.favorite);
  };

  logout = () => {
    this.props.logOutUser({})
    this.props.clearFavorites([])
    this.setCurrentMovieCategoryGlobalState("now_playing")
  }

  evaluateRouteClass = (type) => {
    let futureClass = 'route-button'

    if (this.state.currentDisplay[0] === type) futureClass += ' clicked-route-button'
    if (this.state.currentDisplay === type) futureClass += ' clicked-route-button'
    
    return futureClass
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='welcome-header'>
            {!this.props.id.data && <div></div>}
            {this.props.id.data && 
              <div>
                <h1 className='user-name'>Welcome: {this.props.id.data.name}</h1>
                <div className='user-buttons'>
                  <NavLink to="/favorites">
                    <button 
                      className={`user-fave-button ${this.evaluateRouteClass('favorites')}`}
                      onClick={() => this.setFavoriteState()}>
                        View Favorites
                    </button>
                  </NavLink>
                  <NavLink to='/'>
                    <button className='user-fave-button' onClick={() => this.logout()}>Sign Out</button>
                  </NavLink>
                </div>
              </div>
            }
          </div>
          <div className='title-header'>
            <h1 className="App-title">Welcome to MovieTracker</h1>
            <div className='title-buttons'>
              <NavLink to="/">
                <button
                  className={this.evaluateRouteClass('now_playing')}
                  onClick={() => this.setCurrentMovieCategoryGlobalState("now_playing")}>
                    Now Playing
                </button>
              </NavLink>
              <NavLink to="/popular">
                <button 
                  className={this.evaluateRouteClass('popular')}
                  onClick={() => this.setCurrentMovieCategoryGlobalState("popular")}>
                    Popular
                </button>
              </NavLink>
              <NavLink to="/top_rated">
                <button 
                  className={this.evaluateRouteClass('top_rated')}
                  onClick={() => this.setCurrentMovieCategoryGlobalState("top_rated")}>
                    Top Rated
                </button>
              </NavLink>
              <NavLink to="/upcoming">
                <button 
                  className={this.evaluateRouteClass('upcoming')}
                  onClick={() => this.setCurrentMovieCategoryGlobalState("upcoming")}>
                    Upcoming
                </button>
              </NavLink>
            </div>        
          </div>
          <div className='login-header'>
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
              setFavoriteState={this.setFavoriteState}
              />} 
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
  clearFavorites: favorite => dispatch(resetFavorites(favorite)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
