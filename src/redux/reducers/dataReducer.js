import {
  SET_BUDGETS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_BUDGET,
  DELETE_CATEGORY,
  DELETE_EXPENSE,
  POST_EXPENSE,
  POST_CATEGORY,
  POST_BUDGET,
  SET_SCREAM,
  SUBMIT_COMMENT,
  SET_CATEGORIES,
  SET_EXPENSES
} from '../types';

const initialState = {
  budgets: [],
  categories: [],
  expenses: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_BUDGETS:
      return {
        ...state,
        budgets: action.payload,
        loading: false
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state
      };
    case DELETE_BUDGET:
      index = state.budgets.findIndex(
        (budget) => budget.budgetId === action.payload
      );
      state.budgets.splice(index, 1);
      return {
        ...state
      };
    case DELETE_CATEGORY:
      index = state.categories.findIndex(
        (category) => category.categoryId === action.payload
      );
      state.categories.splice(index, 1);
      return {
        ...state
      };
    case DELETE_EXPENSE:
      index = state.expenses.findIndex(
        (expense) => expense.expenseId === action.payload
      );
      state.expenses.splice(index, 1);
      return {
        ...state
      };
    case POST_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses]
      };
      case POST_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories]
      };
      case POST_BUDGET:
      return {
        ...state,
        budgets: [action.payload, ...state.budgets]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
