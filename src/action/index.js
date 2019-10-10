import axios from 'axios';
import { baseUrl } from '../utility/constant';

const deleteUser = id => {
    return {
        type: "DELETE_USER",
        data: id
    };
};

export const deleteUserAPI = id => dispatch => {
    return axios.delete(`${baseUrl}/${id}`).then(() => {
      dispatch(deleteUser(id));
    });
};

export const fetchUsersAPI = () => dispatch => {
    return axios.get(baseUrl).then(({data}) => {
      dispatch(setUsers(data));
    });
};
  
const setUsers = data => {
    return {
        type: "FETCH_USERS",
        data
    };
};