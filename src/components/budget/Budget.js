import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteBudget from './DeleteBudget';
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

class Budget extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      budget: {
        description,
        amount,
        budgetId,
        createdAt,
        userId
      },
      user: {
        authenticated,
        credentials
      }
    } = this.props;

    const deleteButton =
      authenticated && userId === credentials.userId ? (
        <DeleteBudget budgetId={budgetId} />
      ) : null;
    return (
      <div className="column">
        <div className="card">
            <Typography
                variant="h6"
                component={Link}
                to={`/categories/${budgetId}`}
                color="primary"
                >
                {description}
              </Typography>
            <CardContent className={classes.content}>
              {deleteButton}
              <Typography variant="body2" color="textSecondary">
                Created {dayjs(createdAt).fromNow()}
              </Typography>
              <Typography variant="body1">Amount: {amount}</Typography>
            </CardContent>
          </div>
      </div>
    );
  }
}

Budget.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Budget));
