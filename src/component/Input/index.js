import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, onChange, title, type, value }) => {
    return (  
        <div className="form-group">
            <label htmlFor={name} className="form-label">{ title }</label>
            <input
                className="form-input"
                id={ name }
                name={ name }
                type={ type }
                value={ value }
                onChange={ onChange }
            />
        </div>
    );
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default Input;