import React, { useGlobal, useState, useEffect } from "reactn";
import "../style.scss";
import serverIsRunning from "../helper";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const [, setserverError] = useGlobal("serverError");
  const [serverErrorLocal, setserverErrorLocal] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    serverIsRunning().then((isRunning) => {
      if (isRunning) {
        setserverError(false);
      } else {
        setserverError(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    setLoading(true);
    serverIsRunning().then((isRunning) => {
      if (isRunning) {
        setserverError(false);
        setserverErrorLocal(false);
        setLoading(false);
      } else {
        setserverError(true);
        setserverErrorLocal(true);
        setInterval(() => {
          setLoading(false);
        }, 3000);
      }
    });
  };

  return (
    <div>
      <h1 className="margin_top_small">Oh no!</h1>
      <div className="d-flex p-2 flex-column">
        <img style={{ height: "350px" }} src={require("../lib/error.svg")} className="m-4" alt="error-icon" />
        {serverErrorLocal ? (
          <div className="alert alert-danger m-4">Network Error! Please try again later!</div>
        ) : null}
        <div className="alert alert-warning m-4 d-flex justify-content-between align-items-center">
          {`Check Server Status: ${serverErrorLocal ? "Still down 😔" : "Up Again! 😃"}`}
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
          <button type="button" className="btn-warning btn btn-primary" onClick={handleClick}>
            Check
          </button>
        </div>
        {serverErrorLocal ? null : (
          <Link to="/" className="m-4">
            <button
              type="button"
              className="btn-success btn btn-primary w-100"
              onClick={handleClick}
            >
              Back to login!
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
