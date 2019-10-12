import React, { Component } from "react";
import "./App.css";
import { Route, withRouter, Redirect } from "react-router-dom";
import routes from "./routes/routes";
import Books from "./Pages/Books/Books";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import CartIcon from "./Components/Cart/CartIcon";
import fetchData, { updateBooks } from "./Services/fetchData";

import { GET_BOOKS, POST_BOOKS, GET_USERS } from "./Constants/ServerUrl";
import Cart from "./Pages/Cart.js/Cart";
import LoginPage from "./Pages/Login/LoginPage";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { IconButton } from "@material-ui/core";

class App extends Component {
  state = {
    bookList: [],
    setBookList: [],
    cart: [],
    isOpen: false,
    users: [],
    isAuthenticated: false,
    username: "",
    password: "",
    customInputLabel: "Username",
    customInputPlaceHolder: "Enter the Name",
    customPasswordLabel: "Password",
    customPasswordPlaceHolder: "Enter the Password"
  };
  // componentDidMount() {
  //   debugger;
  //   const { history, location } = this.props;
  //   if (location.pathname === "/") {
  //     history.push(routes.books);
  //   }
  // }

  // componentWillUpdate() {
  //   debugger;
  //   const { history, location } = this.props;
  //   if (location.pathname === "/login" && this.state.isAuthenticated === true) {
  //     history.push(routes.books);
  //   }
  // }

  componentDidMount() {
    debugger;
    this.loadPostData();
    this.loadUsersData();
    const { history, location } = this.props;
    if (location.pathname === "/" && this.state.isAuthenticated === false) {
      //history.push(routes.login);
    }
  }

  loadUsersData = async () => {
    debugger;
    try {
      const users = await fetchData(GET_USERS, "GET");
      console.log(users);
      debugger;
      this.setState({ users });
    } catch (e) {
      console.error(e);
    }
  };

  onUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
    debugger;
  };

  checkLogin = e => {
    debugger;
    e.preventDefault();
    const { username, password, users } = this.state;
    const { history, location } = this.props;
    debugger;
    let dbUser = users.filter(user => user.name == username);
    debugger;
    if (dbUser[0].password === password) {
      this.setState({
        isAuthenticated: true
      });
      debugger;
      history.push(routes.books);
    } else {
      alert("Please enter the valid credentials");
    }
  };

  signOut = () => {
    debugger;
    this.setState({
      isAuthenticated: false
    });
    this.props.history.push("/");
  };

  loadPostData = async () => {
    try {
      const bookList = await fetchData(GET_BOOKS, "GET");
      console.log(bookList);
      this.setState({ bookList, setBookList: bookList });
    } catch (e) {
      console.error(e);
    }
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  handleSearch = e => {
    debugger;
    console.log(e.target.value);
    let currentBookList = [...this.state.bookList];
    let newBookList = [];
    if (e.target.value !== "") {
      newBookList = currentBookList.filter(item => {
        debugger;
        const lc = item.title.toLowerCase();
        const searchedItem = e.target.value.toLowerCase();

        return lc.includes(searchedItem);
      });
    } else {
      newBookList = this.state.setBookList;
    }
    this.setState({
      bookList: newBookList
    });
    debugger;
  };

  handleAddToCart = book => {
    debugger;
    const { cart } = this.state;
    const cartItem = cart.find(x => x.id === book.id);
    cart.length < 3
      ? !cartItem && book.noOfBooks > 0
        ? (book.noOfBooks = book.noOfBooks - 1) &&
          this.setState({ cart: [...this.state.cart, book] })
        : (book.noOfBooks = "Stock not available")
      : alert("you reached the maximum number of books added to the cart!");
    debugger;
  };

  handleRemoveFromCart = book => {
    debugger;
    const { cart } = this.state;
    const filteredCart = cart.filter(x => x.id !== book.id);
    book.noOfBooks = ++book.noOfBooks;
    this.setState({
      cart: filteredCart
    });
    debugger;
  };

  handleCheckOut = books => {
    const { bookList } = this.state;
    debugger;
    let filteredBooks = [];
    for (let book in books) {
      debugger;
      filteredBooks = bookList.filter(x =>
        x.id === books[book].id ? (x.availability = "no") : x.availability
      );
    }

    debugger;
    this.setState({
      bookList: filteredBooks,
      cart: []
    });
    debugger;

    // const requestBody = {
    //   books: books
    // };
    // try {
    //   const bookList = await updateBooks(POST_BOOKS, "POST", requestBody);
    //   console.log(bookList);
    //   this.setState({ bookList, setBookList: bookList });
    // } catch (e) {
    //   console.error(e);
    // }
  };

  render() {
    const {
      cart,
      bookList,
      isOpen,
      users,
      isAuthenticated,
      customInputLabel,
      customInputPlaceHolder,
      customPasswordLabel,
      customPasswordPlaceHolder
    } = this.state;
    debugger;
    return (
      <div className="App">
        {isAuthenticated ? (
          <Navbar color="light" light expand="md">
            <NavbarBrand to={routes.books}>Smart Library</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink to={routes.cart}></NavLink>
                </NavItem>
                <NavItem>
                  <CartIcon
                    cart={cart}
                    handleRemoveFromCart={this.handleRemoveFromCart}
                  >
                    Cart
                  </CartIcon>
                </NavItem>
                <NavItem>
                  <AccountCircle />
                  <button onClick={this.signOut}>Sign out</button>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        ) : (
          <div className="container">
            <LoginPage
              users={users}
              isAuthenticated={isAuthenticated}
              onUsernameChange={this.onUsernameChange}
              onPasswordChange={this.onPasswordChange}
              checkLogin={this.checkLogin}
              customInputLabel={customInputLabel}
              customInputPlaceHolder={customInputPlaceHolder}
              customPasswordLabel={customPasswordLabel}
              customPasswordPlaceHolder={customPasswordPlaceHolder}
            />
          </div>
        )}
        <Route
          path={routes.cart}
          render={() =>
            isAuthenticated ? (
              <Cart
                cart={cart}
                handleRemoveFromCart={this.handleRemoveFromCart}
                handleCheckOut={this.handleCheckOut}
              />
            ) : (
              <Redirect
                to={{
                  pathname: "/login"
                }}
              />
            )
          }
        />
        <Route
          path={routes.books}
          render={() =>
            isAuthenticated ? (
              <Books
                bookList={bookList}
                cart={cart}
                handleAddToCart={this.handleAddToCart}
                handleRemoveFromCart={this.handleRemoveFromCart}
                handleSearch={this.handleSearch}
                isAuthenticated={isAuthenticated}
              />
            ) : (
              <Redirect
                to={{
                  pathname: "/login"
                }}
              />
            )
          }
        />
      </div>
    );
  }
}

export default withRouter(App);
