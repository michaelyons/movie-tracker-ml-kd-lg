import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieCard } from '../actions/makeMovies.js';
import { Card } from './Card'

class CardsContainer extends Component {
  render() {
    return (
      <div>
        { this.props.addCardReducer.map(card => <Card {...card}/> )}
      </div>)
  }
}

const mapStateToProps = (card) => ({
  addCardReducer: card.addCardReducer
})

const mapDispatchToProps = (dispatch) => ({
  makeCards: ((movieArray) => dispatch(movieCard(movieArray)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer)