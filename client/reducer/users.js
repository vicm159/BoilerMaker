import axios from 'axios';

const A_USER = 'A_USER';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';

const gotUser = user => {
  return {
    type: A_USER,
    user,
  };
};

const addedUser = newUser => {
  return {
    type: ADD_USER,
    newUser,
  };
};

const deletedUser = oldUserid => {
  return {
    type: DELETE_USER,
    oldUserid,
  };
};

export const fetchUser = id => {
  return async dispatch => {
    const response = await axios.get(`/api/users/${id}`);
    const user = response.data;
    const action = gotUser(user);
    dispatch(action);
  };
};

export const addUser = newUser => {
  return async dispatch => {
    const response = await axios.post('/api/users', newUser);
    const user = response.data;
    const action = addedUser(user);
    dispatch(action);
  };
};

export const deleteUser = oldUserid => {
  return async dispatch => {
    await axios.delete(`/api/users/${oldUserid}`);
    const action = deletedUser(oldUserid);
    dispatch(action);
  };
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default usersReducer;
