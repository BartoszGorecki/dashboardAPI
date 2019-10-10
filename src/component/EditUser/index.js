import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithVisualForm from '../WithVisualForm';
import { editUserInputs, errors } from '../../utility/constant';
import { editUserAPI, setSelectedUser } from '../../action';

import Button from '../Button';
import Input from '../Input';

const EDIT_USER = "Edit user";

class EditUser extends Component {

    static displayName = 'EditUser';

    state = {
        formErrors: { 
            email: '', 
            name: '',
            username: '' },
        formValid: true,
        emailValid: true,
        nameValid: true,
        usernameValid: true,
        user: {
            city: '',
            email: '',
            name: '',
            username: ''
        }
    }

    componentDidMount() {
        if (!this.props.selectedUser) {
            this.props.history.push('/');
            return;
        }
        const { email, name } = this.props.selectedUser;
        const city = this.props.selectedUser.address ? this.props.selectedUser.address.city : '';
        const username = this.props.selectedUser.username || '';
        this.setState({ user: { city, email, name, username } });
    }

    goToMainPage = () => {
        this.props.history.push('/');
        this.props.setSelectedUser(null);
    }

    handleChange = ({ target: { name, value } }) => {
        if (name === 'name') this.isNameDirty = true;
        if (name === 'email') this.isEmailDirty = true;
        if (name === 'username') this.isUsernameDirty = true;
        this.setState({ user: { ...this.state.user, [name]: value } }, () => this.validateField(name, value));
    }

    submitFormHandler = async e => {
        e.preventDefault();
        if (!this.state.formValid) return;
        if (this.makingReq) return;
        this.makingReq = true;
        const { user: { email, name, username } } = this.state;
        const city = !!this.state.city ? this.state.city : 'no information';
        const { editUserAPI, selectedUser } = this.props;
        const tempUser = {
            email,
            name,
            username
        }
        const updatedUser = {
            ...selectedUser, ...tempUser, address: {...selectedUser.address, city}
        }
        await editUserAPI(updatedUser);
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
        return editUserInputs.map(({ name, title, type }) => {
            const { formErrors, user } = this.state;
            return (
                <Input 
                    formErrors={ formErrors }
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

const mapStateToProps = state => ({
    selectedUser: state.dashboard.selectedUser,
    users: state.dashboard.users
});

const wrappedEditUser = WithVisualForm(EditUser, EDIT_USER);

export default connect(mapStateToProps, { editUserAPI, setSelectedUser })(wrappedEditUser);