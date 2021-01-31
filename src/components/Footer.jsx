import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>MD.Rashed Afridi || Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
