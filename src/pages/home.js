import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Budget from '../components/budget/Budget';
import ScreamSkeleton from '../util/ScreamSkeleton';

import { connect } from 'react-redux';
import { getBudgets } from '../redux/actions/budgetActions';
import BudgetSkeleton from '../components/budget/BudgetSkeleton';

class home extends Component {
  componentDidMount() {
    this.props.getBudgets();
  }
  render() {
    const { budgets, loading } = this.props.data;
    let budgetListMarkup = !loading ? (
      budgets.map((budget) => <Budget key={budget.budgetId} budget={budget} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <div className="budget-list">
        <h3>Budgets</h3>
        <div class="row">
          <BudgetSkeleton />
          {budgetListMarkup}
        </div>
      </div>
    );
  }
}

home.propTypes = {
  getBudgets: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getBudgets }
)(home);
