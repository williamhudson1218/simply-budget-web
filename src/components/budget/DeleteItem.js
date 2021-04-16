import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { deleteExpense, deleteBudget, deleteCategory } from '../../redux/actions/dataActions';

import {
  DELETE_BUDGET,
  DELETE_CATEGORY,
  DELETE_EXPENSE
} from '../../redux/types';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

class DeleteItem extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteItem = () => {
    switch (this.props.action){
      case DELETE_EXPENSE:
        this.props.deleteExpense(this.props.id);
        break;
      case DELETE_CATEGORY:
        this.props.deleteCategory(this.props.id);
        break;
        case DELETE_BUDGET:
          this.props.deleteBudget(this.props.id);
        break;
      default:
        break;
    }
    this.setState({ open: false });
  };
  render() {
    let description = "Item";
    if(this.props.action === DELETE_EXPENSE)
      description = "Expense";
    else if(this.props.action === DELETE_CATEGORY)
      description = "Category";
    else if(this.props.action === DELETE_BUDGET)
      description = "Budget";
    return (
      <Fragment>
        <MyButton
          tip={`Delete ${description}`}
          onClick={this.handleOpen}>
          <CloseIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this {description}?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteItem} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteItem.propTypes = {
  DeleteItem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  expenseId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteExpense, deleteBudget, deleteCategory }
)(withStyles(styles)(DeleteItem));
