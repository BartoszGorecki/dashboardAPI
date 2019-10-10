import React from 'react';
import PropTypes from 'prop-types';

import { validBtnText, validBtnVariant } from '../../utility/constant';

import './button.css';

const Button = ({variant, onClick, text}) => {
    return (
        <button className={ 'btn ' + variant } onClick={ onClick }>{ text }</button>
    );
}

Button.displayName = 'Button'

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.oneOf(validBtnText),
    variant: PropTypes.oneOf(validBtnVariant)
};

Button.defaultProps = {
    onClick: () => {}
  };

export default Button;