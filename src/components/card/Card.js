import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export const Card = ({ id, title, overview, rating, image, date, saveFavorite }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <img src={image} alt="movie image" />
      <h3>Rating: {rating}</h3>
      <p>{overview}</p>
      <p>{date}</p>
      <button onClick={() => saveFavorite(id, title, image, date, rating, overview)}>FAVORITE</button>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};
