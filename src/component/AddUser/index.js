import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithVisualForm from '../WithVisualForm';
import { addUserInputs } from '../../utility/constant';
import { generateRandomIndex } from '../../utility/function';
import { addUserAPI } from '../../action';

import Button from '../Button';
import Input from '../Input';

const ADD_USER = 'Add user';

class AddUser extends Component {

    static displayName = 'AddUser';

    state = {
        user: {
            name: '',
            email: ''
        }
    }

    goToMainPage = () => this.props.history.push('/');

    handleChange = ({ target: { name, value } }) => {
        this.setState({ user: { ...this.state.user, [name]: value } });
    }

    submitFormHnadler = async e => {
        e.preventDefault();
        const { user } = this.state;
        const id = generateRandomIndex();
        await this.props.addUserAPI({ ...user, id });
        this.goToMainPage();
    }

    renderBtnWrapper = () => {
        return (
            <div className='btnWrapper'>
                <Button 
                    onClick={ () => this.goToMainPage() }
                    text='Cancel'
                    variant='cancel'
                />
                <Button 
                    text='Submit'
                    type='submit'
                    variant='submit'
                />
            </div>
        )
    }

    renderInputs = () => {
        return addUserInputs.map(({ name, title, type }) => {
            const { user } = this.state;
            return (
                <Input 
                    key={name}
                    name={ name }
                    title={ title }
                    type={ type }
                    value={ user[name] }
                    onChange={ this.handleChange }
                />
            );
        });
    }

    render() {
        return (
            <>
                <form onSubmit={this.submitFormHnadler}>
                    { this.renderInputs() }
                    { this.renderBtnWrapper() }
                </form>
            </>
        );
    }
}

const wrappedAddUser = WithVisualForm(AddUser, ADD_USER);

export default connect(null, { addUserAPI })(wrappedAddUser);