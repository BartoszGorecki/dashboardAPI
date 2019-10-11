import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

const Input = ({ formErrors, name, onChange, title, type, value }) => {
    return (  
        <div className="form-group">
            <label htmlFor={ name } className="form-label">{ title }</label>
            <input
                className={ "form-input " + (!!formErrors[name] ? 'form-input-error' : '') }
                id={ name }
                name={ name }
                type={ type }
                value={ value }
                onChange={ onChange }
            />
            { !!formErrors[name] && <span className='form-error'>{ formErrors[name] }</span> }
        </div>
    );
}

Input.displayName = 'Input';

Input.propTypes = {
    formErrors: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        username: PropTypes.string
    }).isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default Input;