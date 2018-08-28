import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard } from '../actions/makeMovies.js';
import { Card } from './Card'

class CardsContainer extends Component {
  render() {
    return (
      <div>
        { this.props.data.map(card => <Card {...card}/> )}
      </div>
    )
  }
}

const mapStateToProps = (card) => ({
  data: card.addCardReducer
})

// const mapDispatchToProps = (dispatch) => ({
//   makeCards: ((movieArray) => dispatch(movieCard(movieArray)))
// })

export default connect(mapStateToProps)(CardsContainer)