import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import PropTypes from "prop-types";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

const BookList = ({
  id,
  title,
  author,
  genre,
  totalBooks,
  year,
  availability,
  image,
  book,
  handleAddToCart,
  handleRemoveFromCart,
  cart,
  availableDate
}) => {
  debugger;
  return (
    <Card id={id} disabled={availability == "no"}>
      <CardImg src={image} alt={"loading"} />
      <CardBody>
        <h3>{title}</h3>
        <CardSubtitle> {`Author : ${author}`}</CardSubtitle>
        <CardSubtitle>Genre : {genre}</CardSubtitle>
        <CardSubtitle>Year : {year}</CardSubtitle>
        <CardText>
          Availability :
          <strong
            style={
              availability == "yes" ? { color: "green" } : { color: "red" }
            }
          >
            {availability}
            {availability == "no" ? (
              <CardText>{`Available on : ${availableDate}`}</CardText>
            ) : (
              ""
            )}
          </strong>
        </CardText>
        {/* <CardText>
          In Stock : <strong>{totalBooks}</strong>
        </CardText> */}

        {cart.find(x => x.id === id) ? (
          <button
            className="btn btn-danger"
            onClick={handleRemoveFromCart.bind(this, book)}
          >
            {/* <FontAwesomeIcon icon={faMinus} size="5x"></FontAwesomeIcon>
            Book Added to bag */}
            <RemoveRoundedIcon />
            Remove from cart
          </button>
        ) : (
          <button
            disabled={availability == "no"}
            className="btn btn-primary"
            onClick={handleAddToCart.bind(this, book)}
          >
            {/* <FontAwesomeIcon icon={faPlus} size="5x"></FontAwesomeIcon>Add to bag */}
            {/* <span className="btn-floating halfway-fab waves-effect waves-light red">
              <i className="material-icons">add</i>
            </span> */}
            <AddIcon />
            Add to cart
          </button>
        )}
      </CardBody>
    </Card>
  );
};

BookList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  availability: PropTypes.string.isRequired,
  cart: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired
};
export default BookList;
