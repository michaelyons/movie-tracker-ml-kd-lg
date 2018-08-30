import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { movieCard } from '../actions/makeMovies.js';
import { Card } from '../../components/card/Card.js';
import './CardsContainer.css';
import { addFavorite } from '../../helpers.js';

class CardsContainer extends Component {
  saveFavorite = async (id, title, image, date, rating, overview) => {
    const userId = this.props.id.data.id
    console.log(userId)
    const response = await addFavorite(id, userId, title, image, date, rating, overview)
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
  data: card.displayMovieCardsReducer,
  id: card.loginUserReducer
});

// const mapDispatchToProps = (dispatch) => ({
//   makeCards: ((movieArray) => dispatch(movieCard(movieArray)))
// })

export default connect(mapStateToProps)(CardsContainer);
