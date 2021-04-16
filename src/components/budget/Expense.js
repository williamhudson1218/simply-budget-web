import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import DeleteItem from "./DeleteItem";
import EditExpense from "./EditExpense";
// MUI Stuff
import Typography from "@material-ui/core/Typography";
// Redux
import { connect } from "react-redux";
import moment from "moment";
import { DELETE_EXPENSE } from "../../redux/types";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Expense extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      expense: { description, amount, expenseId, createdAt, recursMonthly },
    } = this.props;
    return (
      <div className="column">
        <div className="card">
          <span className="delete-item">
            <DeleteItem id={expenseId} action={DELETE_EXPENSE} />
          </span>
          <span className="edit-item">
            <EditExpense expense={this.props.expense} />
          </span>
          <Typography variant="body2" color="textSecondary">
            {moment(createdAt).format("MMM DD, YYYY")}
          </Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body1">
            ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </Typography>
          {recursMonthly === true ? (
            <div className="recurs-monthly">Recurs Monthly</div>
          ) : null}
        </div>
      </div>
    );
  }
}

Expense.propTypes = {
  user: PropTypes.object.isRequired,
  //category: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Expense));
