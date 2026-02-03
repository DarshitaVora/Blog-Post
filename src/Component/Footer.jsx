import React, { useContext } from "react";
import "./Footer.css";
import ModeContext from "../Context/ModeContext";

export default function Footer() {
  const ctx = useContext(ModeContext); // get theme mode
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${ctx.mode === "dark" ? "footer-dark" : "footer-light"}`}>
      <p className="footer-text">
        ©{currentYear}. All rights are reserved &nbsp; <b>BlogPost</b>
      </p>
    </footer>
  );
}
