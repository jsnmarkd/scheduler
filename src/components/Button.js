import React from "react";

import "components/Button.scss";

export default function Button(props) {
  const { children, confirm, danger, onClick, disabled } = props;

  let buttonClass = "button";

  if (confirm) {
    buttonClass += " button--confirm";
  }

  if (danger) {
    buttonClass += " button--danger";
  }

  return <button onClick={onClick} disabled={disabled} className={buttonClass}>{children}</button>;
}
