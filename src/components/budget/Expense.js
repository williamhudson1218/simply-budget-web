import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import DeleteExpense from "./DeleteExpense";
// MUI Stuff
import Typography from "@material-ui/core/Typography";
// Redux
import { connect } from "react-redux";
import moment from "moment";

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
      expense: { description, amount, expenseId, createdAt, userId, recursMonthly },
      user: {
        authenticated,
        credentials
      },
    } = this.props;
    const deleteButton =
      authenticated && userId === credentials.userId ? (
        <DeleteExpense expenseId={expenseId} />
      ) : null;
    return (
      <div className="column">
        <div className="card">
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {moment(createdAt).format("MMM DD, YYYY")}
          </Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body1">${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
          { recursMonthly === true ? <div className="recurs-monthly">Recurs Monthly</div> : null }
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
