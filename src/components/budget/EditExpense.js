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
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import { updateExpense, clearErrors } from "../../redux/actions/expenseActions";
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

class EditExpense extends Component {
  state = {
    open: false,
    description: "",
    amount: 0.0,
    createdAt: moment().format("yyyy-MM-DD"),
    errors: {},
    recursMonthly: false
  };
  componentDidMount(){
    this.setState({
      ...this.props.expense,
      createdAt: moment(this.state.createdAt).format("yyyy-MM-DD")
    })
  }
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
    if (event.target.type === "checkbox")
      this.setState({ [event.target.name]: event.target.checked });
    else this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateExpense({
      description: this.state.description,
      amount: this.state.amount,
      createdAt: this.state.createdAt,
      categoryId: this.state.categoryId,
      recursMonthly: this.state.recursMonthly,
      expenseId: this.state.expenseId
    });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Save">
          <EditIcon />
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
          <DialogTitle>Edit expense</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                name="description"
                type="text"
                label="Expense"
                rows="1"
                value={this.state.description}
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
                value={this.state.amount}
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
                  checked={this.state.recursMonthly}
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

EditExpense.propTypes = {
  updateExpense: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { updateExpense, clearErrors })(
  withStyles(styles)(EditExpense)
);
