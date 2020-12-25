import React, { useEffect, useState } from "react";
import "./Cookies.css";

const Cookies = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("cookieAccepted") !== "true") {
        setIsActive(true);
      }
    }, 2000);
  }, []);
  const handleCookieSubmit = () => {
    setIsActive(false);
    localStorage.setItem("cookieAccepted", "true");
  };

  return (
    <div className={`cookie-container ${isActive && "active"}`}>
      <p>This site uses cookies to deliver better user experience.</p>
      <button onClick={handleCookieSubmit} className="cookie-button">
        Understood
      </button>
    </div>
  );
};

export default Cookies;
