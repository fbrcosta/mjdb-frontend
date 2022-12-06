import React from "react";

export default function Copyright() {
  return (
    <span>
      &copy; {1900 + new Date().getYear()}{" "}
      Miniju DB
      , made with love for Jujuzinha
    </span>
  );
}
