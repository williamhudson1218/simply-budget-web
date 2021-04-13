import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeleteCategory from './DeleteCategory';
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

class Category extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      category: {
        description,
        amount,
        categoryId,
        createdAt,
        userId,
        totalAmount
      },
      user: {
        authenticated,
        credentials
      }
    } = this.props;

    const useAmount = amount ? amount : 0;
    const useTotalAmount = totalAmount ? totalAmount : 0;
    const balance = useAmount - useTotalAmount;

    const deleteButton =
      authenticated && userId === credentials.userId ? (
        <DeleteCategory categoryId={categoryId} />
      ) : null;
    return (
      <div className="column">
        <div className="card">
        <Typography
            variant="h5"
            component={Link}
            to={`/expenses/${categoryId}`}
            color="primary"
          >
            {description}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">Budgeted Amount: ${useAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
          <Typography variant="body1">Month Total: ${useTotalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
          <div className={balance >= 0 ? "positive-balance": "negative-balance"}>${balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  user: PropTypes.object.isRequired,
  //category: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Category));
