import {
    SET_BUDGETS,
    LOADING_DATA,
    DELETE_BUDGET,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    POST_BUDGET,
    UPDATE_BUDGET,
  } from '../types';
  import axios from 'axios';
  
  // Get all screams
  export const getBudgets = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/budgets')
      .then((res) => {
        dispatch({
          type: SET_BUDGETS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_BUDGETS,
          payload: []
        });
      });
  };
 
  // Post a scream
  export const postBudget = (newBudget) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/budget', newBudget)
      .then((res) => {
        dispatch({
          type: POST_BUDGET,
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
  
  export const updateBudget = (budget) => (dispatch) => {
    console.log(budget)
    dispatch({ type: LOADING_UI });
    axios
      .patch(`/budget/${budget.budgetId}`, budget)
      .then((res) => {
        res.data.amount = budget.amount;
        res.data.totalAmount = budget.totalAmount;
        dispatch({  
          type: UPDATE_BUDGET,
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
  
  export const deleteBudget = (budgetId) => (dispatch) => {
    axios
      .delete(`/budget/${budgetId}`)
      .then(() => {
        dispatch({ type: DELETE_BUDGET, payload: budgetId });
      })
      .catch((err) => console.log(err));
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  