import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { movieCard } from '../actions/makeMovies.js';
import { Card } from '../../components/card/Card.js';
import './CardsContainer.css';
import { addFavorite } from '../../helpers.js';

class CardsContainer extends Component {
  saveFavorite = async (id, title, image, date, rating, overview) => {
    const response = await addFavorite(id, 1, title, image, date, rating, overview)
    console.log(response)
  }

  render() {
    return (
      <div className="cards-container">
        {this.props.data.map(card => (
          <Card {...card} key={card.id} saveFavorite={this.saveFavorite} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = card => ({
  data: card.displayMovieCardsReducer
});

// const mapDispatchToProps = (dispatch) => ({
//   makeCards: ((movieArray) => dispatch(movieCard(movieArray)))
// })

export default connect(mapStateToProps)(CardsContainer);
