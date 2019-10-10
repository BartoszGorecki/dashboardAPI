import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithVisualForm from '../WithVisualForm';
import { addUserInputs, errors } from '../../utility/constant';
import { generateRandomIndex } from '../../utility/function';
import { addUserAPI } from '../../action';

import Button from '../Button';
import Input from '../Input';

import './addUser.css';

const ADD_USER = 'Add user';

class AddUser extends Component {

    static displayName = 'AddUser';

    state = {
        formErrors: { 
            email: '', 
            name: '',
            username: '' },
        formValid: false,
        emailValid: false,
        nameValid: false,
        usernameValid: false,
        user: {
            name: '',
            email: '',
            username: ''
        }
    }

    componentDidMount = () => {
        this.isEmailDirty = false;
        this.isNameDirty = false;
        this.isUsernameDirty = false;
    }

    goToMainPage = () => this.props.history.push('/');

    handleChange = ({ target: { name, value } }) => {
        if (name === 'name') this.isNameDirty = true;
        if (name === 'email') this.isEmailDirty = true;
        if (name === 'username') this.isUsernameDirty = true;
        this.setState({ user: { ...this.state.user, [name]: value } }, () => this.validateField(name, value));
    }

    submitFormHandler = async e => {
        e.preventDefault();
        if (!this.state.formValid) {
            const { email, name, username } = errors;
            if (!this.isNameDirty && this.isUsernameDirty && this.isEmailDirty) this.setState({ formErrors: {...this.state.formErrors, name}});
            if (!this.isNameDirty && !this.isEmailDirty && this.isUsernameDirty) this.setState({ formErrors: {...this.state.formErrors, name, email}});
            if (!this.isNameDirty && !this.isUsernameDirty && this.isEmailDirty) this.setState({ formErrors: {...this.state.formErrors, username, name}});
            if (!this.isEmailDirty && this.isNameDirty && this.isUsernameDirty) this.setState({ formErrors: {...this.state.formErrors, email}});
            if (!this.isEmailDirty && !this.isUsernameDirty && this.isNameDirty) this.setState({ formErrors: {...this.state.formErrors, email, username}});
            if (!this.isUsernameDirty && this.isEmailDirty && this.isNameDirty) this.setState({ formErrors: {...this.state.formErrors, username}});
            if (!this.isEmailDirty && !this.isUsernameDirty && !this.isNameDirty) this.setState({ formErrors: {...this.state.formErrors, email, name, username}});
            return;
        }
        if (this.makingReq) return;
        this.makingReq = true;
        const { user } = this.state;
        const id = generateRandomIndex();
        await this.props.addUserAPI({ ...user, id });
        this.goToMainPage();
        this.makingReq = false;
    }

    validateField = (name, value) => {
        const stateCopy = { ...this.state};
        let { emailValid, formErrors, nameValid, usernameValid } = stateCopy;
      
        switch (name) {
          case 'name':
              if (value.length === 0) {
                    nameValid = false;
                    formErrors.name = errors.name;
              } else {
                    nameValid = value.length >= 3;
                    formErrors.name = nameValid ? '' : 'Name is too short';
              }
            break;
          case 'email':
              if (value.length === 0) {
                    emailValid = false
                    formErrors.email = errors.email;
              } else {
                    emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})/i).test(value);
                    formErrors.email = emailValid ? '' : 'Email is invalid';
              }
            break;
          case 'username':
            if (value.length === 0) {
                    usernameValid = false;
                    formErrors.username = errors.username;
                } else {
                    usernameValid = value.length >= 3;
                    formErrors.username = usernameValid ? '' : 'Username is too short';
                }
            break;
          default:
            break;
        }
        this.setState({ formErrors, nameValid, emailValid, usernameValid }, () => this.validateForm());
    }
      
    validateForm = () => {
        const { emailValid, nameValid, usernameValid } = this.state;
        this.setState({ formValid: emailValid && nameValid && usernameValid });
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
            const { formErrors, user } = this.state;
            return (
                <Input 
                    formErrors={ formErrors }
                    key={ name }
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