import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// MUI Stuff
import Typography from '@material-ui/core/Typography';
// Redux
import { connect } from 'react-redux';
import { DELETE_CATEGORY, UPDATE_CATEGORY } from "../../redux/types";
import DeleteItem from "./DeleteItem";
import AddEditCategory from "./AddEditCategory";

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
        totalAmount
      }
    } = this.props;

    const useAmount = amount ? amount : 0;
    const useTotalAmount = totalAmount ? totalAmount : 0;
    const balance = useAmount - useTotalAmount;

    return (
      <div className="column">
        <span className="delete-item">
          <DeleteItem id={categoryId} action={DELETE_CATEGORY}/>
        </span>
          <span className="edit-item">
            <AddEditCategory category={this.props.category} action={UPDATE_CATEGORY}/>
        </span>
        <Link to={`/expenses/${categoryId}`}>
          <div className="card">
          <Typography
              variant="h5"
              color="primary"
            >
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">Budgeted Amount: ${useAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
            <Typography variant="body1">Month Total: ${useTotalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
            <div className={balance >= 0 ? "positive-balance": "negative-balance"}>${balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
          </div>
        </Link>
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
