import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '../../components/card/Card.js';
import './CardsContainer.css';
import { addFavorite, viewFavoritesFetchCall } from '../../helpers.js';
import { addFavorites } from '../../actions/index.js';

class CardsContainer extends Component {
  saveFavorite = (id, title, image, date, rating, overview) => {
    const userId = this.props.id.data.id;
    addFavorite(id, userId, title, image, date, rating, overview);
    this.viewFavoritesPage();
  };

  viewFavoritesPage = async () => {
    const user_id = this.props.id.data.id;
    const url = `http://localhost:3000/api/users/${user_id}/favorites`;
    const userFavoritesData = await viewFavoritesFetchCall(url);
    this.props.addFavoriteMovie(userFavoritesData);
  };

  render() {
    return (
      <div className="cards-container">
        {!this.props.clicked &&
          this.props.data.map(card => (
            <Card {...card} key={card.id} saveFavorite={this.saveFavorite} />
          ))}
        {this.props.clicked &&
          this.props.favorite.data.map(card => (
            <Card {...card} key={card.id} saveFavorite={this.saveFavorite} />
          ))}
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
  addFavoriteMovie: favorite => dispatch(addFavorites(favorite))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsContainer);
