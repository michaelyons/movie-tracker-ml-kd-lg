import React from 'react';
import PropTypes from 'prop-types'

export const Card = ({title, overview, rating}) => {
  return(
    <div className="Card">
      <h2>{title}</h2>
      <p>{overview}</p>
      <h3>{rating}</h3>
    </div>
    )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}