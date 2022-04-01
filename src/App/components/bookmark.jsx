import React, { useState } from "react";

const BookMark = () => {
  const toggle = (event) => {
    const { target } = event;
    target.className === "bi bi-bookmark"
      ? (target.className = "bi bi-bookmark-fill")
      : (target.className = "bi bi-bookmark");
  };
  return (
    <button
      className="bi bi-bookmark"
      onClick={(event) => toggle(event)}
    ></button>
  );
};

export default BookMark;
