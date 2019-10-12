import React from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import { NavLink } from "react-router-dom";
import routes from "../../routes/routes";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";

const CartComponent = ({
  cart,
  handleRemoveFromCart,
  backToBookPage,
  modal,
  toggle,
  backdrop,
  keyboard,
  handleCheckOut
}) => {
  debugger;
  return (
    <div>
      {cart.length ? (
        <Modal
          isOpen={modal}
          toggle={toggle}
          id={cart.id}
          backdrop={backdrop}
          size="lg"
          keyboard={keyboard}
        >
          <ModalBody>
            <Table>
              <TableHead></TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <strong>Book Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Author</strong>
                </TableCell>
                <TableCell>
                  <strong>Published Year</strong>
                </TableCell>
              </TableRow>
              {cart.map((cartIter, cartIndex) => {
                return (
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <img
                          className="thumbnail"
                          src={cartIter.image}
                          alt={"loading"}
                        />
                      </TableCell>
                      <TableCell>
                        <strong>{cartIter.title}</strong>
                      </TableCell>
                      <TableCell>
                        <p>{cartIter.author}</p>
                      </TableCell>
                      <TableCell>
                        <p>{cartIter.yearOfPublication}</p>
                      </TableCell>
                      <TableCell>
                        <Button
                          className="btn btn-danger"
                          onClick={handleRemoveFromCart.bind(
                            this,
                            cartIter,
                            cart
                          )}
                        >
                          <RemoveRoundedIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </ModalBody>
          <ModalFooter>
            <NavLink to={routes.books}>
              <Button color="primary" onClick={handleCheckOut.bind(this, cart)}>
                Check out
              </Button>
            </NavLink>

            <NavLink to={routes.books}>
              <Button color="secondary">Cancel</Button>
            </NavLink>
          </ModalFooter>
          <ModalFooter>
            {cart.length == 3 ? (
              <strong style={{ color: "red" }}>
                "you have added the maximum number of books to the cart!"
              </strong>
            ) : (
              <strong style={{ color: "green" }}>
                still you can add {3 - cart.length} books
              </strong>
            )}
          </ModalFooter>
        </Modal>
      ) : (
        <Modal
          isOpen={modal}
          toggle={toggle}
          id={cart.id}
          backdrop={backdrop}
          keyboard={keyboard}
        >
          <ModalHeader>Hi Buddy!</ModalHeader>
          <ModalBody>Please Add the books to the cart!</ModalBody>
          <ModalFooter>
            <NavLink to={routes.books}>
              <Button color="secondary">Cancel</Button>
            </NavLink>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

CartComponent.propTypes = {
  cart: PropTypes.array.isRequired,
  modal: PropTypes.bool.isRequired,
  keyboard: PropTypes.bool.isRequired,
  backdrop: PropTypes.string.isRequired
};
export default CartComponent;
