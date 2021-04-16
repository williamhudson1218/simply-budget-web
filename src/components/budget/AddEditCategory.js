import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import { postCategory, updateCategory, clearErrors } from "../../redux/actions/dataActions";
import { POST_CATEGORY, UPDATE_CATEGORY } from "../../redux/types";

const styles = (theme) => ({
  ...theme,
  submitButton: {
    position: "relative",
    float: "right",
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

class AddEditCategory extends Component {
  state = {
    open: false,
    description: "",
    errors: {},
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
        open: false,
        errors: {},
      });
    }
  }
  componentDidMount(){
    this.setState({
      ...this.props.category,
    })
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.props.action === POST_CATEGORY){
      this.props.postCategory({
        description: this.state.description,
        budgetId: this.props.budgetId,
        amount: this.state.amount
      })
    }
    if(this.props.action === UPDATE_CATEGORY){
      console.log(this.state)
      this.props.updateCategory({
        description: this.state.description,
        budgetId: this.state.budgetId,
        amount: this.state.amount,
        totalAmount: this.state.totalAmount,
        categoryId: this.state.categoryId
      })
    }
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    let description = "Item";
    if (this.props.action === POST_CATEGORY) description = "Add";
    else if (this.props.action === UPDATE_CATEGORY) description = "Edit";
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip={`${description} Category`}>
        {this.props.action === POST_CATEGORY ?  <AddIcon /> : <EditIcon />}
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
          <DialogTitle>{description} category</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="description"
                type="text"
                label="Cateogry"
                value={this.state.description}
                placeholder="Enter category description"
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
                value={this.state.amount}
                placeholder="Category Budget Amount"
                error={errors.amount ? true : false}
                helperText={errors.amount}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                step="0.01"
              />
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

AddEditCategory.propTypes = {
  postCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postCategory, updateCategory, clearErrors })(
  withStyles(styles)(AddEditCategory)
);
