import {
  SET_BUDGETS,
  LOADING_DATA,
  DELETE_BUDGET,
  DELETE_CATEGORY,
  DELETE_EXPENSE,
  POST_EXPENSE,
  POST_CATEGORY,
  POST_BUDGET,
  SET_CATEGORY,
  SET_CATEGORIES,
  SET_EXPENSES,
  UPDATE_EXPENSE,
  UPDATE_BUDGET,
  UPDATE_CATEGORY,
} from "../types";

const initialState = {
  budgets: [],
  categories: [],
  expenses: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_BUDGETS:
      return {
        ...state,
        budgets: action.payload,
        loading: false,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case UPDATE_EXPENSE:
      let index = state.expenses.findIndex(
        (ex) => ex.expenseId === action.payload.expenseId
      );
      let newArray = [...state.expenses];
      newArray[index] = action.payload;
      return {
        ...state,
        expenses: newArray,
        loading: false,
      };
    case SET_EXPENSES:
      console.log(state);
      return {
        ...state,
        expenses: action.payload,
        loading: false,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case DELETE_BUDGET:
      index = state.budgets.findIndex(
        (budget) => budget.budgetId === action.payload
      );
      state.budgets.splice(index, 1);
      return {
        ...state,
      };
    case DELETE_CATEGORY:
      index = state.categories.findIndex(
        (category) => category.categoryId === action.payload
      );
      state.categories.splice(index, 1);
      return {
        ...state,
      };
    case DELETE_EXPENSE:
      index = state.expenses.findIndex(
        (expense) => expense.expenseId === action.payload
      );
      state.expenses.splice(index, 1);
      return {
        ...state,
      };
    case POST_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      };
    case POST_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
      };
    case POST_BUDGET:
      return {
        ...state,
        budgets: [action.payload, ...state.budgets],
      };
    case UPDATE_BUDGET:
      index = state.budgets.findIndex(
        (bud) => bud.budgetId === action.payload.budgetId
      );
      console.log(action.payload);
      newArray = [...state.budgets];
      newArray[index] = action.payload;
      return {
        ...state,
        budgets: newArray,
        loading: false,
      };
    case UPDATE_CATEGORY:
    console.log(action.payload)
      index = state.categories.findIndex(
        (cat) => cat.categoryId === action.payload.categoryId
      );
      newArray = [...state.categories];
      newArray[index] = action.payload;
      return {
        ...state,
        categories: newArray,
        loading: false,
      };
    default:
      return state;
  }
}
