import axios from 'axios';
import store from "../store";
import { baseUrl } from '../utility/constant';

// addUser
export const ADD_USER = "ADD_USER";
export const addUserAPI = data => dispatch => {
    return axios.post(baseUrl, data).then(() => {
      dispatch(addUser(data));
    });
};
const addUser = data => {
    return {
        type: ADD_USER,
        data
    };
};

// deleteUser
export const DELETE_USER = "DELETE_USER";
export const deleteUserAPI = id => dispatch => {
    return axios.delete(`${baseUrl}/${id}`).then(() => {
      dispatch(deleteUser(id));
    });
};
const deleteUser = id => {
    return {
        type: DELETE_USER,
        data: id
    };
};

// editUser
export const EDIT_USER = 'EDIT_USER';
export const editUserAPI = user => dispatch => {
    const { id } = user;
    return axios.put(`${baseUrl}/${id}`, user).then(({ data }) => {
      dispatch(editUser(data));
    });
};
const editUser = data => {
    const users = store.getState().dashboard.users;
    const index = users.findIndex(user => user.id === data.id);
    return {
        type: EDIT_USER,
        data,
        index
    };
};

// fetchUsers
export const FETCH_USERS = "FETCH_USERS";
const setUsers = data => {
    return {
        type: FETCH_USERS,
        data
    };
};
export const fetchUsersAPI = () => dispatch => {
    return axios.get(baseUrl).then(({ data }) => {
      dispatch(setUsers(data));
    });
};

// setSelectedUser
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const setSelectedUser = data => {
    return {
        type: SET_SELECTED_USER,
        data
    };
};