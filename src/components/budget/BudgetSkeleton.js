import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import AddEditBudget from './AddEditBudget';
// Redux
import { connect } from 'react-redux';
import { POST_BUDGET } from "../../redux/types";

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
                <AddEditBudget action={POST_BUDGET}/>
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
