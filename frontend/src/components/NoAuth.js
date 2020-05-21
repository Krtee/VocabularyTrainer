import React from "react";
import { Link } from "react-router-dom";

function NoAuth() {
  return (
    <div>
      <p>Please create an account!</p>
      <Link to="/">Login Page</Link>
    </div>
  );
}

export default NoAuth;
