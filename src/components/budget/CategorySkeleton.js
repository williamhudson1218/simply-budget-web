import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import AddEditCategory from './AddEditCategory';
// Redux
import { connect } from 'react-redux';
import { POST_CATEGORY } from "../../redux/types";

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
    return (
        <div className="column">
            <div className="card">
                <AddEditCategory budgetId={this.props.budgetId} action={POST_CATEGORY}/>
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
