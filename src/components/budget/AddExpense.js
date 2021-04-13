import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import { postExpense, clearErrors } from "../../redux/actions/dataActions";
import moment from "moment";

const styles = (theme) => ({
  ...theme,
  submitButton: {
    position: "relative",
    float: "center",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "85%",
    top: "6%",
  },
});

class AddExpense extends Component {
  state = {
    open: false,
    description: "",
    amount: 0.0,
    createdAt: moment().format("yyyy-MM-DD"),
    errors: {},
    recursMonthly: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        description: "",
        amount: 0.0,
        createdAt: moment().format("yyyy-MM-DD"),
        open: false,
        errors: {},
        recursMonthly: false
      });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    if(event.target.type === "checkbox")
      this.setState({ [event.target.name]: event.target.checked });
    else
      this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postExpense({
      description: this.state.description,
      amount: this.state.amount,
      createdAt: this.state.createdAt,
      categoryId: this.props.categoryId,
      recursMonthly: this.state.recursMonthly
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Add Expense">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Add new expense</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="description"
                type="text"
                label="Expense"
                rows="1"
                placeholder="Enter expense description"
                error={errors.description ? true : false}
                helperText={errors.description}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="amount"
                type="decimal"
                label="Amount"
                rows="1"
                placeholder="Enter expense amount"
                error={errors.amount ? true : false}
                helperText={errors.amount}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                step="0.01"
              />
              <TextField
                name="createdAt"
                type="date"
                value={this.state.createdAt}
                error={errors.createdAt ? true : false}
                helperText={errors.createdAt}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <div>
                <Checkbox
                  name="recursMonthly"
                  value={this.state.recursMonthly}
                  check={this.state.recursMonthly}
                  error={errors.recursMonthly ? true : false}
                  onChange={this.handleChange}
                />
                Recurs Monthly
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

AddExpense.propTypes = {
  postExpense: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postExpense, clearErrors })(
  withStyles(styles)(AddExpense)
);
