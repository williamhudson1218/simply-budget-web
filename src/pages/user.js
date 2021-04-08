import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Budget from '../components/budget/Budget';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    budgetIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const budgetId = this.props.match.params.budgetId;

    if (budgetId) this.setState({ budgetIdParam: budgetId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { budgets, loading } = this.props.data;
    const { budgetIdParam } = this.state;

    const budgetsMarkup = loading ? (
      <ScreamSkeleton />
    ) : budgets === null ? (
      <p>No budgets from this user</p>
    ) : !budgetIdParam ? (
      budgets.map((budget) => <Budget key={budget.budgetId} budget={budget} />)
    ) : (
      budgets.map((budget) => {
        if (budget.budgetId !== budgetIdParam)
          return <Budget key={budget.budgetId} budget={budget} />;
        else return <Budget key={budget.budgetId} budget={budget} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {budgetsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
