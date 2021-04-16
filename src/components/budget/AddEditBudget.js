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
import { postBudget, clearErrors, updateBudget } from "../../redux/actions/dataActions";
import moment from "moment";
import { POST_BUDGET, UPDATE_BUDGET } from "../../redux/types";

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

class AddEditBudget extends Component {
  state = {
    open: false,
    description: "",
    createdAt: moment().format("yyyy-MM-DD"),
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
        createdAt: moment().format("yyyy-MM-DD"),
        open: false,
        errors: {},
      });
    }
  }
  componentDidMount(){
    this.setState({
      ...this.props.budget,
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
    if(this.props.action === POST_BUDGET){
      this.props.postBudget({
        description: this.state.description,
        createdAt: this.state.createdAt,
      })
    }
    if(this.props.action === UPDATE_BUDGET){
      this.props.updateBudget({
        description: this.state.description,
        budgetId: this.state.budgetId,
        amount: this.state.amount,
        totalAmount: this.state.totalAmount
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
    if (this.props.action === POST_BUDGET) description = "Add";
    else if (this.props.action === UPDATE_BUDGET) description = "Edit";
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip={`${description} Budget`}>
          {this.props.action === POST_BUDGET ?  <AddIcon /> : <EditIcon />}
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
          <DialogTitle>{description} budget</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="description"
                type="text"
                label="Budget"
                rows="1"
                value={this.state.description}
                placeholder="Enter budget description"
                error={errors.description ? true : false}
                helperText={errors.description}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
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

AddEditBudget.propTypes = {
  postBudget: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postBudget, updateBudget, clearErrors })(
  withStyles(styles)(AddEditBudget)
);
