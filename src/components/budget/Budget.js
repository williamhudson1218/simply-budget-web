import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteItem from "./DeleteItem";
import { DELETE_BUDGET, UPDATE_BUDGET } from "../../redux/types";
// Redux
import { connect } from 'react-redux';
import AddEditBudget from './AddEditBudget';

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
        totalAmount,
        budgetId,
        amount
      }
    } = this.props;

    const useAmount = amount ? amount : 0;
    const useTotalAmount = totalAmount ? totalAmount : 0;
    const balance = useAmount - useTotalAmount;

    return (
      <div className="column">
        <span className="delete-item">
          <DeleteItem id={budgetId} action={DELETE_BUDGET}/>
        </span>
          <span className="edit-item">
            <AddEditBudget budget={this.props.budget} action={UPDATE_BUDGET}/>
        </span>
        <Link to={`/categories/${budgetId}`}>
          <div className="card">
            <Typography
                variant="h6"
                color="primary"
                >
                {description}
              </Typography>
            <CardContent className={classes.content}>
              <Typography variant="body1">Budgeted Amount: ${useAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
              <Typography variant="body1">Month Total: ${useTotalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
              <div className={balance >= 0 ? "positive-balance": "negative-balance"}>${balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
            </CardContent>
          </div>
        </Link>
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
