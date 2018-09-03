import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '../../components/card/Card.js';
import './CardsContainer.css';
import { addFavorite, deleteFavorite } from '../../helpers.js';
import { addFavorites, deleteFavorites } from '../../actions/index';

class CardsContainer extends Component {
  saveFavorite = (id, title, image, date, rating, overview) => {
    let userId;

    if (this.props.id.status === 'success') userId = this.props.id.data.id;
    else return alert('Please log in to create favorites');

    const userFavoritesData = {
      id,
      userId,
      title,
      image,
      date,
      rating,
      overview
    };

    this.filterFavorites(
      id,
      userId,
      title,
      image,
      date,
      rating,
      overview,
      userFavoritesData
    );
  };

  filterFavorites = (
    id,
    userId,
    title,
    image,
    date,
    rating,
    overview,
    userFavoritesData
  ) => {
    let counter = 0;

    this.props.favorite.forEach(favorite => {
      if (title === favorite.title) {
        deleteFavorite(id, userId);
        console.log(id, userId)
        this.props.deleteFavoriteMovie(userFavoritesData);
        counter++;
        return;
      }
    });

    if (counter === 0) {
      addFavorite(id, userId, title, image, date, rating, overview);
      this.props.addFavoriteMovie(userFavoritesData);
    }
  };

  render() {
    return (
      <div className="cards-container">
        {this.props.data.map(card => (<Card {...card} key={card.id} saveFavorite={this.saveFavorite} />))}
      </div>
    );
  }
}

const mapStateToProps = card => ({
  data: card.displayMovieCardsReducer,
  id: card.loginUserReducer,
  favorite: card.addFavoriteMovieReducer
});

const mapDispatchToProps = dispatch => ({
  addFavoriteMovie: favorite => dispatch(addFavorites(favorite)),
  deleteFavoriteMovie: deleted => dispatch(deleteFavorites(deleted))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsContainer);
