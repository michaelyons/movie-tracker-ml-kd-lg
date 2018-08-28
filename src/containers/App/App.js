import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { MSTP, MDTP } from 'react';
import { movieCard } from '../../actions/makeMovies.js';
import './App.css';
import { key } from '../../helpers/key.js';
import { firstFetch } from '../../helpers/fetch.js';
import { CardsContainer } from '../../components/CardsContainer.js';


class App extends Component {  
  componentDidMount = async (props) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1/`
    const data = await firstFetch(url)
    movieCard(data)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MovieTracker</h1>
        </header>
        <CardsContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards
})

const mapDispatchToProps = (dispatch) => ({
  makeCards: (movieArray) => dispatch(movieCard(movieArray))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
