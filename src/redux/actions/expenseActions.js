import {
    LOADING_DATA,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_EXPENSES,
    DELETE_EXPENSE,
    UPDATE_EXPENSE,
    POST_EXPENSE
  } from '../types';
  import axios from 'axios';

  // Get all categories by budget id
export const getExpenses = (categoryId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/expenses/${categoryId}`)
      .then((res) => {
        dispatch({
          type: SET_EXPENSES,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_EXPENSES,
          payload: []
        });
      });
  };
  // Post a expense
  export const postExpense = (newExpense) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/expense', newExpense)
      .then((res) => {
        res.data.amount = res.data.amount / 100
        dispatch({  
          type: POST_EXPENSE,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  export const updateExpense = (expense) => (dispatch) => {
    console.log(expense)
    dispatch({ type: LOADING_UI });
    axios
      .patch(`/expense/${expense.expenseId}`, expense)
      .then((res) => {
        res.data.amount = res.data.amount / 100
        dispatch({  
          type: UPDATE_EXPENSE,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  export const deleteExpense = (expenseId) => (dispatch) => {
    axios
      .delete(`/expense/${expenseId}`)
      .then(() => {
        dispatch({ type: DELETE_EXPENSE, payload: expenseId });
      })
      .catch((err) => console.log(err));
  };

  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };