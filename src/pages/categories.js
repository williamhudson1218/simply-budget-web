import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Category from '../components/budget/Category';
import ScreamSkeleton from '../util/ScreamSkeleton';

import { connect } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions';
import CategorySkeleton from '../components/budget/CategorySkeleton';

class categories extends Component {
  componentDidMount() {
    const budgetId = this.props.match.params.budgetId;
    this.props.getCategories(budgetId);
  }
  render() {
    const { categories, loading } = this.props.data;
    let categoriesMarkup = !loading ? (
        categories.map((category) => <Category key={category.categoryId} category={category} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
        <div className="budget-list">
        <h3>My Categories</h3>
        <div class="row">
            <CategorySkeleton budgetId={this.props.match.params.budgetId} />
          {categoriesMarkup}
        </div>
      </div>
    );
  }
}

categories.propTypes = {
  getBudgets: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getCategories }
)(categories);
