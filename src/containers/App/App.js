import React, { Component } from 'react';
import './App.css';
import { key } from '../../helpers/key.js';
import { firstFetch } from '../../helpers/fetch.js'

class App extends Component {  
  componentDidMount = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1/`
    const data = await firstFetch(url)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MovieTracker</h1>
        </header>
      </div>
    );
  }
}

export default App;
