import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '../../components/card/Card.js';
import './CardsContainer.css';
import { addFavorite } from '../../helpers.js';
import { addFavorites } from '../../actions/index';


class CardsContainer extends Component {
  saveFavorite = (id, title, image, date, rating, overview) => {
    let userId;

    if (this.props.id.status === 'success') userId = this.props.id.data.id
    else return alert('Please log in to create favorites')

    const userFavoritesData = {
        id, 
        userId, 
        title, 
        image, 
        date, 
        rating, 
        overview
      }
      this.filterFavorites(id, userId, title, image, date, rating, overview, userFavoritesData)
    };
    
    filterFavorites = (id, userId, title, image, date, rating, overview, userFavoritesData) => {
      let counter = 0;

      this.props.favorite.forEach(favorite => {
        // favorite.data.forEach(fave => {
          if (id === favorite.movie_id) {
            console.log('match')
            counter++
            return
          }
        })
      // }) 

      if (counter === 0) {
        console.log('no matches')
        addFavorite(id, userId, title, image, date, rating, overview);
        this.props.addFavoriteMovie(userFavoritesData);
      }
    }

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
  addFavoriteMovie: favorite => dispatch(addFavorites(favorite)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer);
