import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '../../components/card/Card.js';
import './CardsContainer.css';
import { addFavorite, deleteFavorite } from '../../helpers.js';
import { addFavorites, deleteFavorites, movieCard } from '../../actions/index';

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

  filterFavorites = async (
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

    await this.props.favorite.forEach(favorite => {
      if (title === favorite.title) {
        counter++;
        deleteFavorite(id, userId);
        this.props.deleteFavoriteMovie(userFavoritesData);
        return;
      }
    });

    if (counter === 0) {
      addFavorite(id, userId, title, image, date, rating, overview);
      this.props.addFavoriteMovie(userFavoritesData);
    }

    if (this.props.clicked) {
      this.props.setFavoriteState();
    }
  };

  evaluateClass = title => {
    let futureClass = 'button';
    const favorites = this.props.favorite.map(favorite => favorite.title);

    if (favorites.includes(title)) futureClass += ' fave-clicked';

    return futureClass;
  };

  render() {
    return (
      <div className="cards-container">
        {this.props.data.map(card => (
          <Card
            {...card}
            key={card.id}
            saveFavorite={this.saveFavorite}
            evaluateClass={this.evaluateClass}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.displayMovieCardsReducer,
  id: state.loginUserReducer,
  favorite: state.addFavoriteMovieReducer
});

const mapDispatchToProps = dispatch => ({
  makeCards: movieArray => dispatch(movieCard(movieArray)),
  addFavoriteMovie: favorite => dispatch(addFavorites(favorite)),
  deleteFavoriteMovie: deleted => dispatch(deleteFavorites(deleted))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsContainer);
