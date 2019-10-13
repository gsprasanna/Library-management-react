import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import Login from "../../Components/Login/Login";

class LoginPage extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.setState({
      users: this.props.users
    });
  }

  render() {
    const { users } = this.state;
    const {
      isAuthenticated,
      onUsernameChange,
      onPasswordChange,
      checkLogin,
      customInputLabel,
      customInputPlaceholder,
      customPasswordLabel,
      customPasswordPlaceholder
    } = this.props;
    return (
      <>
        <h4>Smart Library</h4>
        <Login
          users={users}
          isAuthenticated={isAuthenticated}
          onUsernameChange={onUsernameChange}
          onPasswordChange={onPasswordChange}
          checkLogin={checkLogin}
          customInputLabel={customInputLabel}
          customInputPlaceholder={customInputPlaceholder}
          customPasswordLabel={customPasswordLabel}
          customPasswordPlaceholder={customPasswordPlaceholder}
        />
      </>
    );
  }
}

export default LoginPage;
