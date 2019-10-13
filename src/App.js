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

class App extends Component {
  state = {
    bookList: [],
    setBookList: [],
    cart: [],
    bookNextAvailability: "",
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

  componentDidMount() {
    debugger;
    const { username, isAuthenticated } = this.state;
    // let auth = localStorage.getItem("localAuth");
    // if (auth != null && auth.isAuthenticated == true) {
    //   this.setState({
    //     username: auth.username,
    //     isAuthenticated: auth.isAuthenticated
    //   });
    // }
    this.loadPostData();
    this.loadUsersData();
    const { history, location } = this.props;
    if (location.pathname === "/" && this.state.isAuthenticated === false) {
      history.push(routes.login);
    }
  }

  loadUsersData = async () => {
    debugger;
    try {
      const users = await fetchData(GET_USERS, "GET");
      //console.log(users);
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
    const { username, password, users, isAuthenticated } = this.state;
    const { history, location } = this.props;
    debugger;
    let dbUser = users.filter(user => user.name == username);
    debugger;
    if (dbUser[0].password === password) {
      const { isAuthenticated } = this.state;
      this.setState({
        isAuthenticated: true
      });
      let accountAuthDetails = {
        username: this.state.username,
        isAuthenticated: true
      };
      localStorage.setItem("localAuth", JSON.stringify(accountAuthDetails));
      debugger;
      history.push(routes.books);
      // return <Redirect to={routes.books} />;
    } else {
      alert("Please enter the valid credentials");
    }
  };

  signOut = () => {
    debugger;
    this.setState({
      isAuthenticated: false
    });
    localStorage.removeItem("localAuth");
    this.props.history.push("/login");
  };

  loadPostData = async () => {
    try {
      const bookList = await fetchData(GET_BOOKS, "GET");
      //console.log(bookList);
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
    //console.log(e.target.value);
    let currentBookList = [...this.state.bookList];
    let newBookList = [];
    if (e.target.value !== "") {
      newBookList = currentBookList.filter(item => {
        debugger;
        const lc = item.title.toLowerCase();
        const searchedItem = e.target.value;

        return (
          item.title.toLowerCase().includes(searchedItem.toLowerCase()) ||
          item.author.toLowerCase().includes(searchedItem.toLowerCase()) ||
          item.genre.toLowerCase().includes(searchedItem.toLowerCase()) ||
          item.yearOfPublication.toString().includes(searchedItem.toString())
        );
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
    const { bookList, bookNextAvailability } = this.state;
    debugger;
    let filteredBooks = [];
    for (let book in books) {
      debugger;
      filteredBooks = bookList.filter(x =>
        x.id === books[book].id ? (x.availability = "no") : x.availability
      );
    }
    let todayDate = new Date();
    let numberOfDaysToAdd = 5;
    todayDate.setDate(todayDate.getDate() + numberOfDaysToAdd);
    let dd = todayDate.getDate();
    let mm = todayDate.getMonth();
    let y = todayDate.getFullYear();

    let predictedAvailaibility = dd + "/" + mm + "/" + y;
    debugger;
    this.setState({
      bookList: filteredBooks,
      cart: [],
      bookNextAvailability: predictedAvailaibility
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
      customPasswordPlaceHolder,
      bookNextAvailability
    } = this.state;
    debugger;
    return (
      <div className="App">
        {isAuthenticated ? (
          <Navbar color="lightgreen" light expand="md">
            <NavbarBrand to={routes.books}>Smart Library</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <CartIcon
                    cart={cart}
                    handleRemoveFromCart={this.handleRemoveFromCart}
                  >
                    Cart
                  </CartIcon>
                </NavItem>
                <NavItem>
                  <AccountCircle className="user-icon" />
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
                availableDate={bookNextAvailability}
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
