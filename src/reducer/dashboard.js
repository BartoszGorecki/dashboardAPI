const initialState = {
  users: []
};
  
export default (state = initialState, action) => {
  const {data, type} = action;
  switch (type) {
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter(user => user.id !== data)
      }
    case "FETCH_USERS":
      return {
        ...state,
        users: data
      };
    default:
      return state;
  }
};