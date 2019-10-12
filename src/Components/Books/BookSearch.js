import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from "prop-types";
import { MDBCol, MDBIcon } from "mdbreact";

const BookSearch = ({ searchType, placeholderText, onChange }) => {
  console.log();
  return (
    <MDBCol md="6">
      <div className="active-pink-3 active-pink-4 mb-4">
        <input
          className="form-control"
          type={searchType}
          placeholder={placeholderText}
          aria-label="Search"
          onChange={onChange}
        />
      </div>
    </MDBCol>
  );
};

BookSearch.propTypes = {
  searchType: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired
};
export default BookSearch;

{
  /* <form>
      <input
        type={searchType}
        placeholder={placeholderText}
        className="search-keyword"
        onChange={onChange}
      />
    </form> */
}
