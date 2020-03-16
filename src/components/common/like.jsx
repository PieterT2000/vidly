import React from "react";

const Like = ({ movieLiked, onClick }) => {
  let classes = "fa fa-heart";
  if (!movieLiked) classes += "-o";
  return (
    <button
      onClick={onClick}
      style={{ border: 0, backgroundColor: "#fff", outline: 0, padding: 0 }}
    >
      <i className={classes} aria-hidden="true"></i>
    </button>
  );
};

export default Like;
