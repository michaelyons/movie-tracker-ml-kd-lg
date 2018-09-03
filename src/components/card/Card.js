import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export const Card = ({ id, title, overview, rating, image, date, saveFavorite, evaluateClass }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <img src={image} alt="movie poster" />
      <h3>Rating: {rating}</h3>
      <p>{overview}</p>
      <p>{date}</p>
      <button 
        className={evaluateClass(title)} 
        onClick={() => {
          saveFavorite(id, title, image, date, rating, overview)
        }}>FAVORITE</button>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  rating: PropTypes.number,
  image: PropTypes.string,
  date: PropTypes.string,
  saveFavorite: PropTypes.func,
  evaluateClass: PropTypes.func
};
