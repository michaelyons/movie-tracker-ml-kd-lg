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
      loggedIn: false
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
    this.setCurrentMovieCategoryGlobalState(value)
  }

  clickedIt = () => {
    this.setState({
      loggedIn: true
    })
  }

  signOut = () => {
    window.location.reload(true);
  }

  render() {
    console.log(this.props.id.data)
    return (
      <div className="App">
        <header className="App-header">
          {!this.props.id.data && <div></div>}
          {this.props.id.data && 
            <div>
              <h1 className='user-name'>Welcome {this.props.id.data.name}</h1>
              <div className='user-buttons'>
                <button onClick={() => this.setFavoritesState()}>
                  View Favorites
                </button>
                <button onClick={() => this.props.logOutUser({})}>Sign Out</button>
              </div>
            </div>
          }
          <h1 className="App-title">Welcome to MovieTracker</h1>

          <NavLink to="/favorites">
            <button 
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
          <aside>
            <NavLink to="/login" className="login-nav" >
            <button onClick={() => this.clickedIt()}>Log In</button>
            </NavLink>
             -- or -- 
            <Link to="/signup" className="signup-nav">Sign Up</Link>
             -- or -- 
            <button onClick={() => this.signOut()}>Sign Out</button>
          </aside>
          <Route exact path='/login' component={UserLogin} />
          <Route exact path='/signup' component={UserSignup} />
          <Route exact path='/' component={CardsContainer} />
          <Route exact path = '/upcoming' component={CardsContainer} />
          <Route exact path = '/popular' component={CardsContainer} />
          <Route exact path = '/top_rated' component={CardsContainer} />
          <Route exact path = '/favorites' render={() => {
            return <CardsContainer clicked={this.state.clicked} />
          }} />
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
  makeCards: movieArray => dispatch(movieCard(movieArray)),
  logOutUser: user => dispatch(userLogin(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
