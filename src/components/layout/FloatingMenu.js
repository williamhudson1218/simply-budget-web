import React from "react";
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { logoutUser } from "../../redux/actions/userActions";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';

export const FloatingMenu = ({logoutUser}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logoutUser();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MyButton tip="Logout" onClick={handleClick}>
        <AccountCircleIcon color="primary" />
     </MyButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/login">
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

const mapStateToProps = state => ({
    logoutUser: PropTypes.func.isRequired
  });
  
  const mapDispatchToProps = { logoutUser };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FloatingMenu);
