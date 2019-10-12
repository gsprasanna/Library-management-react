import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

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
  totalBooks,
  year,
  availability,
  image,
  book,
  handleAddToCart,
  handleRemoveFromCart,
  cart
}) => {
  debugger;
  return (
    <Card id={id} disabled={availability == "no"}>
      <CardImg src={image} alt={"loading"} />
      <CardBody>
        <h3>{title}</h3>
        <CardSubtitle>Author : {author}</CardSubtitle>
        <CardSubtitle>Year : {year}</CardSubtitle>
        <CardText>
          Availability :
          <strong
            style={
              availability == "yes" ? { color: "green" } : { color: "red" }
            }
          >
            {availability}
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

export default BookList;
