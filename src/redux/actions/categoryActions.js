import {
    SET_CATEGORIES,
    LOADING_DATA,
    DELETE_CATEGORY,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_CATEGORY,
    POST_CATEGORY,
    UPDATE_CATEGORY
  } from '../types';
  import axios from 'axios';

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
        res.data.amount = res.data.amount / 100;
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
  
  export const updateCategory = (category) => (dispatch) => {
    console.log(category)
    dispatch({ type: LOADING_UI });
    axios
      .patch(`/category/${category.categoryId}`, category)
      .then((res) => {
        res.data.amount = res.data.amount / 100;
        res.data.totalAmount = category.totalAmount;
        dispatch({  
          type: UPDATE_CATEGORY,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  export const deleteCategory = (categoryId) => (dispatch) => {
    axios
      .delete(`/category/${categoryId}`)
      .then(() => {
        dispatch({ type: DELETE_CATEGORY, payload: categoryId });
      })
      .catch((err) => console.log(err));
  };

  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  