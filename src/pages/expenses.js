import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Expense from '../components/budget/Expense';
import ScreamSkeleton from '../util/ScreamSkeleton';

import { connect } from 'react-redux';
import { getExpenses } from '../redux/actions/dataActions';
import ExpenseSkeleton from '../components/budget/ExpenseSkeleton';

class expenses extends Component {
  componentDidMount() {
    const categoryId = this.props.match.params.categoryId;
    this.props.getExpenses(categoryId);
  }
  render() {
      console.log(this.state)
    const { expenses, loading } = this.props.data;
    let expensesMarkup = !loading ? (
        expenses.map((expense) => <Expense key={expense.expenseId} expense={expense} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <div className="budget-list">
      <h3>Expenses</h3>
      <ExpenseSkeleton categoryId={this.props.match.params.categoryId}/>
      <div class="row">
        {expensesMarkup}
      </div>
    </div>
    );
  }
}

expenses.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getExpenses }
)(expenses);
