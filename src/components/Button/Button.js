import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text = '', onClick }) => (
  <button className="fc-button" onClick={onClick} type="button">
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
