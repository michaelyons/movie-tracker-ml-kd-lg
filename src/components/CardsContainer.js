import React from 'react';
import { connect } from 'react-redux';
// import { MSTP, MDTP } from 'react';
import { movieCard } from '../actions/makeMovies.js';

export const CardsContainer = () => {
  return(<div></div>)
}

const mapStateToProps = (state) => ({
  cards: state.cards
})

const mapDispatchToProps = (dispatch) => ({
  makeCards: ((movieArray) => dispatch(movieCard(movieArray)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer)