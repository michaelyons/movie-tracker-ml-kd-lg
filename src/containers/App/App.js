import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard } from '../../actions/makeMovies.js';
import './App.css';
import { key } from '../../helpers/key.js';
import { firstFetch } from '../../helpers/fetch.js';
import CardsContainer from '../cardsContainer/CardsContainer';
import { Login } from '../../components/login/Login.js'


class App extends Component {  
  componentDidMount = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1/`
    this.makeFetch(url)
  }

  makeFetch = async (url) => {
    const data = await firstFetch(url)
    this.props.makeCards(data)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MovieTracker</h1>
          <Login />
        </header>
        <CardsContainer />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//    state
// })

const mapDispatchToProps = (dispatch) => ({
  makeCards: (movieArray) => dispatch(movieCard(movieArray))
})

export default connect(null, mapDispatchToProps)(App)