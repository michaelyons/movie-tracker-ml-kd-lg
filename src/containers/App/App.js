import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard } from '../../actions/makeMovies.js';
import './App.css';
import { firstFetch } from '../../helpers/fetch.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import { Login } from '../../components/login/Login.js';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  componentDidMount = async () => {
    const data = 'now_playing';
    this.makeFetch(data);
  };

  makeFetch = async url => {
    const data = await firstFetch(url);
    this.props.makeCards(data);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MovieTracker</h1>
          <Login />
        </header>
        <Route
          path="/"
          render={() => {
            return <CardsContainer />;
          }}
        />
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
