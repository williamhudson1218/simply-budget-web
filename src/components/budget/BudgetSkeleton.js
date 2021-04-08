import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import AddBudget from '../budget/AddBudget';
// MUI Stuff
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class BudgetSkeleton extends Component {
  render() {
    dayjs.extend(relativeTime);
    
    return (
        <div className="column">
            <div className="card">
                <AddBudget />
            </div>
        </div>
    );
  }
}

BudgetSkeleton.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(BudgetSkeleton));
