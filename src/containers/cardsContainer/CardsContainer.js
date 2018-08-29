import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { movieCard } from '../actions/makeMovies.js';
import { Card } from '../../components/card/Card.js'
import './CardsContainer.css'

class CardsContainer extends Component {
  render() {
    return (
      <div className='cards-container' >
        { this.props.data.map(card => <Card {...card}
                                            key={card.id}
          /> ) }
      </div>
    )
  }
}

const mapStateToProps = (card) => ({
  data: card.displayMovieCardsReducer
})

// const mapDispatchToProps = (dispatch) => ({
//   makeCards: ((movieArray) => dispatch(movieCard(movieArray)))
// })

export default connect(mapStateToProps)(CardsContainer)