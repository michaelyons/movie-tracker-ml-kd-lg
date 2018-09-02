import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard, userLogin } from '../../actions/index.js';
import './App.css';
import { currentMovieCategoryFetch } from '../../helpers.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import { Route, Switch } from 'react-router-dom';
import UserLogin from '../userLogin/UserLogin';
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
          <div>
            <Route
              path="/"
              render={() => {
                return <UserLogin />;
              }}
            />
          </div>
        </header>
        <Route
          path="/login"
          render={() => {
            return <UserSignup />;
          }}
        />

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
  makeCards: movieArray => dispatch(movieCard(movieArray)),
  logOutUser: user => dispatch(userLogin(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
