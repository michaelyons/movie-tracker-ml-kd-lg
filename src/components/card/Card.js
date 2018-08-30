import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export const Card = ({ title, overview, rating, image }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <img src={image} alt="movie image" />
      <h3>Rating: {rating}</h3>
      <p>{overview}</p>
      <button>FAVORITE</button>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};
