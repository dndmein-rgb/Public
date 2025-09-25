import React from "react";
import Header from "../components/Header";
import './Error.css'

const Error = ({cart}) => {
  return (
    <>
    <title>404 Page Not Found</title>
      <Header cart={cart} />
      <h1 className="not-found-message">Page not found</h1>
    </>
  );
};

export default Error;
