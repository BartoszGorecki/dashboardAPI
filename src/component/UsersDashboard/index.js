import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUserAPI, fetchUsersAPI } from '../../action';
import { tableHeader } from '../../utility/constant';

import Button from '../Button';
import DeleteUserModal from '../DeleteUserModal';
import WithPortal from '../WithPortal';

import './usersDashboard.css';

export class UsersDashboard extends Component {

    static displayName = 'UserDashboard Page';

    state = {
        selectedUser: null,
        showPortal: false
    }

    componentDidMount() {
        this.props.fetchUsersAPI();
    }

    closeModal = () => this.setState({ showPortal: false });

    deleteUser = async () => {
        await this.props.deleteUserAPI(this.state.selectedUser.id);
        this.setState({ showPortal: false });
    }

    goToDeleteModal = user => {
        this.setState({ selectedUser: user, showPortal: true });
    }

    goToEditPage = user => {
        this.setState({ selectedUser: user }, () => {
            this.props.history.push('/edit');
        });
    }

    renderDeleteTextContext = () => {
        const { username } = this.state.selectedUser;
        return (
            <div>Are you sure that you want to remove user { username }?</div>
        )
    }

    renderTableHeader = () => {
        return tableHeader.map(title => {
            return (
                <th key={ title }>{ title }</th>
            );
        });
    }

    renderTableData = () => {
        return this.props.users.map(user => {
            return (
                <tr key={ user.id }>
                    <td>{ user.id }</td>
                    <td>{ user.name }</td>
                    <td>{ user.username }</td>
                    <td>{ user.email }</td>
                    <td>{ user.address.city }</td>
                    <td>
                        <Button 
                            onClick={ () => this.goToEditPage(user) }
                            text='Edit'
                            variant='edit'
                        />
                    </td>
                    <td>
                        <Button 
                            onClick={ () => this.goToDeleteModal(user) }
                            text='Delete'
                            variant='delete'
                        />
                    </td>
                </tr>
            );
        });
    }

    render() {
        const { showPortal } = this.state;
        const Portal = WithPortal(DeleteUserModal);
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            { this.renderTableHeader() }
                        </tr>
                    </thead>
                    <tbody>
                        { !!this.props.users.length && this.renderTableData() }
                    </tbody>
                </table>
                { showPortal && <Portal
                    onCloseModal={ this.closeModal }
                    onDeleteUser={ this.deleteUser }
                >
                    { this.renderDeleteTextContext() }
                </Portal> }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.dashboard.users
});

export default connect(mapStateToProps, { deleteUserAPI, fetchUsersAPI })(UsersDashboard);
