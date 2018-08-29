import React, { Component } from 'react';

class SearchForm extends Component {
  constructor() {
    super()

    this.state = {
      search: ''
    }
  }

  render() {
    return(
      <form className="Search">
        <input type="text" placeholder="Search for movie" value={this.state.search} />
      </form>
    )
  }
}

export default SearchForm