import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <h3>
        Stay Safe and Wear a Mask{" "}
        <span role="img" aria-label="mask">
          😷
        </span>
      </h3>
      <h3>
        Made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by Aathik Ahamed
      </h3>
      <div>Aathik Ahamed &#169; 2020</div>

      <div>
        <a
          href="https://github.com/aathikahamed/covid-19-tracker/blob/master/README.md#functions-of-this-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          About this App
        </a>
      </div>
    </div>
  );
};

export default Footer;
