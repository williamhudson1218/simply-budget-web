import {
  SET_BUDGETS,
  SET_CATEGORIES,
  LOADING_DATA,
  DELETE_BUDGET,
  DELETE_CATEGORY,
  SET_ERRORS,
  POST_EXPENSE,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_CATEGORY,
  SET_EXPENSES,
  POST_BUDGET,
  POST_CATEGORY,
  DELETE_EXPENSE
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
// Get all categories by budget id
export const getCategories = (budgetId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/categories/${budgetId}`)
    .then((res) => {
      dispatch({
        type: SET_CATEGORIES,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_CATEGORIES,
        payload: []
      });
    });
};
// Get category by id
export const getCategory = (categoryId) => (dispatch) => {
  console.log(categoryId, 'categoryId')
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/category/${categoryId}`)
    .then((res) => {
      dispatch({
        type: SET_CATEGORY,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_CATEGORY,
        payload: []
      });
    });
};
// Post a scream
export const postCategory = (newCategory) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/category', newCategory)
    .then((res) => {
      res.data.amount = res.data.amount / 100
      dispatch({
        type: POST_CATEGORY,
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
export const deleteBudget = (budgetId) => (dispatch) => {
  axios
    .delete(`/budget/${budgetId}`)
    .then(() => {
      dispatch({ type: DELETE_BUDGET, payload: budgetId });
    })
    .catch((err) => console.log(err));
};

export const deleteCategory = (categoryId) => (dispatch) => {
  axios
    .delete(`/category/${categoryId}`)
    .then(() => {
      dispatch({ type: DELETE_CATEGORY, payload: categoryId });
    })
    .catch((err) => console.log(err));
};

export const deleteExpense = (expenseId) => (dispatch) => {
  axios
    .delete(`/expense/${expenseId}`)
    .then(() => {
      dispatch({ type: DELETE_EXPENSE, payload: expenseId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_BUDGETS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_BUDGETS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
