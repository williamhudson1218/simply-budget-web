import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import AddCategory from '../budget/AddCategory';
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

class ExpenseSkeleton extends Component {
  render() {
    dayjs.extend(relativeTime);
    console.log(this.props.budgetId)
    return (
        <div className="column">
            <div className="card">
                <AddCategory budgetId={this.props.budgetId}/>
            </div>
        </div>
    );
  }
}

ExpenseSkeleton.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(ExpenseSkeleton));
