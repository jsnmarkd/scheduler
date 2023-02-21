import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  const { children, confirm, danger, onClick, disabled } = props;

  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClass}>
      {children}
    </button>
  );
}
