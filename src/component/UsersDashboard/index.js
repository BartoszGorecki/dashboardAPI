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

const NO_DATA = 'no information';

export class UsersDashboard extends Component {

    static displayName = 'UserDashboard';

    state = {
        setSort: false,
        showPortal: false,
        sortFromAtoZ: false
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

    sortTable = () => {
        this.state.setSort ? this.setState({ sortFromAtoZ: !this.state.sortFromAtoZ }) :
        this.setState({ setSort: true, sortFromAtoZ: !this.state.sortFromAtoZ});
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
                <th onClick={ title === 'username' ? () =>  this.sortTable() : null } style={{ textTransform: 'capitalize' }} key={ title }>{ title }</th>
            );
        });
    }

    renderTableData = () => {
        const { sortFromAtoZ, setSort } = this.state;
        let usersData;
        if (!setSort) {
            usersData = this.props.users;
        }
        if (sortFromAtoZ && setSort) {
            usersData = this.props.users.sort((a, b) => a.username.localeCompare(b.username));
        }
        if (!sortFromAtoZ && setSort) {
            usersData = this.props.users.sort((a, b) => b.username.localeCompare(a.username));
        }
        return usersData.map(user => {
            const isStarterData = ("" + user.id).length <= 2;
            return (
                <tr key={ user.id }>
                    <td>{ user.id }</td>
                    <td>{ user.name }</td>
                    <td>{ user.username ? user.username : NO_DATA }</td>
                    <td>{ user.email }</td>
                    <td>{ user.address ? user.address.city : NO_DATA }</td>
                    <td>
                        <Button 
                            onClick={ isStarterData ? () => this.goToEditPage(user) : () => alert('You cannot modify custom user!')}
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
