import React from "react";
import "./search-box.component.css";

export const SearchBox = (props) => {
  return (
    <input
      type="search"
      placeholder={props.placeholder}
      onChange={props.handleChange}
      className="search"
    />
  );
};
