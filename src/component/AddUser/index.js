import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithVisualForm from '../WithVisualForm';
import { addUserInputs } from '../../utility/constant';
import { generateRandomIndex } from '../../utility/function';
import { addUserAPI } from '../../action';

import Button from '../Button';
import Input from '../Input';

import './addUser.css';

const ADD_USER = 'Add user';

class AddUser extends Component {

    static displayName = 'AddUser';

    state = {
        addVersion: false,
        user: {
            name: '',
            email: '',
            username: ''
        }
    }

    componentDidMount = () => !this.props.selectedUser && this.setState({ addVersion: true });

    goToMainPage = () => this.props.history.push('/');

    handleChange = ({ target: { name, value } }) => {
        this.setState({ user: { ...this.state.user, [name]: value } });
    }

    submitFormHandler = async e => {
        e.preventDefault();
        if (this.makingReq) return;
        this.makingReq = true;
        const { user } = this.state;
        const id = generateRandomIndex();
        await this.props.addUserAPI({ ...user, id });
        this.goToMainPage();
        this.makingReq = false;
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
                <form onSubmit={this.submitFormHandler}>
                    { this.renderInputs() }
                    { this.renderBtnWrapper() }
                </form>
            </>
        );
    }
}

const wrappedAddUser = WithVisualForm(AddUser, ADD_USER);

export default connect(null, { addUserAPI })(wrappedAddUser);