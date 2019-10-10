import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUserAPI, fetchUsersAPI, setSelectedUser } from '../../action';
import { tableHeader } from '../../utility/constant';
import { confirmationText } from '../../utility/function';

import Button from '../Button';
import DeleteUserModal from '../DeleteUserModal';
import WithVisualForm from '../WithVisualForm';
import WithPortal from '../WithPortal';

import './usersDashboard.css';

const NO_DATA = 'no data';

export class UsersDashboard extends Component {

    static displayName = 'UserDashboard Page';

    state = {
        showPortal: false
    }

    componentDidMount() {
        this.props.users.length === 0 && this.props.fetchUsersAPI();
    }

    closeModal = () => {
        this.setState({ showPortal: false });
        this.props.setSelectedUser(null)
    }

    deleteUser = async () => {
        if (this.makingReq) return;
        this.makingReq = true;
        const { deleteUserAPI, selectedUser, setSelectedUser } = this.props;
        await deleteUserAPI(selectedUser.id);
        this.setState({ showPortal: false }, () => setSelectedUser(null));
        this.makingReq = false
    }

    goToDeleteModal = async user => {
        await this.props.setSelectedUser(user);
        this.setState({ showPortal: true });
    }

    goToEditPage = async user => {
        const { history, setSelectedUser } = this.props;
        await setSelectedUser(user);
        history.push('/edit');
    }

    renderDeleteTextContext = () => {
        const { username } = this.props.selectedUser;
        return (
            <div>{ confirmationText(username) }</div>
        )
    }

    renderTableHeader = () => {
        return tableHeader.map(title => {
            return (
                <th style={{ textTransform: 'capitalize' }} key={ title }>{ title }</th>
            );
        });
    }

    renderTableData = () => {
        return this.props.users.map(user => {
            return (
                <tr key={ user.id }>
                    <td>{ user.id }</td>
                    <td>{ user.name }</td>
                    <td>{ user.username ? user.username : <span style={{ color: 'red' }}>{ NO_DATA }</span> }</td>
                    <td>{ user.email }</td>
                    <td>{ user.address ? user.address.city : <span style={{ color: 'red' }}>{ NO_DATA }</span> }</td>
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
            <>
                <div className='tableWrapper'>
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
                </div>
                { showPortal && <Portal
                    onCloseModal={ this.closeModal }
                    onDeleteUser={ this.deleteUser }
                >
                    { this.renderDeleteTextContext() }
                </Portal> }
            </>
        );
    }
}

const mapStateToProps = state => ({
    selectedUser: state.dashboard.selectedUser,
    users: state.dashboard.users
});

const wrappedUsersDashboard = WithVisualForm(UsersDashboard);

export default connect(mapStateToProps, { deleteUserAPI, fetchUsersAPI, setSelectedUser })(wrappedUsersDashboard);
