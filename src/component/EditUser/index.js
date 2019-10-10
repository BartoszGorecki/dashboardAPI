import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithVisualForm from '../WithVisualForm';
import { editUserInputs } from '../../utility/constant';
import { editUserAPI, setSelectedUser } from '../../action';

import Button from '../Button';
import Input from '../Input';

const EDIT_USER = "Edit user";

class EditUser extends Component {

    static displayName = 'Edituser';

    state = {
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
        this.setState({ user: { ...this.state.user, [name]: value } });
    }

    submitFormHandler = async e => {
        e.preventDefault();
        if (this.makingReq) return;
        this.makingReq = true;
        const { user: { city, email, name, username } } = this.state;
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

const mapStateToProps = state => ({
    selectedUser: state.dashboard.selectedUser,
    users: state.dashboard.users
});

const wrappedEditUser = WithVisualForm(EditUser, EDIT_USER);

export default connect(mapStateToProps, { editUserAPI, setSelectedUser })(wrappedEditUser);