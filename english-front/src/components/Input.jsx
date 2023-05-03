import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";

import "../styles/input.css";

const Input = (props) => {
  const changeHandler = (e) => {
    props.setDataHandler({ id: props.id, value: e.target.value });
  };

  return (
    <div className="input-container">
      <label className="default-lable">{props.lableText}</label>
      <InputText
        id={props.id}
        className={`${
          props.isValidValue ? "default-input" : "not-valid-input"
        } `}
        value={props.value}
        type={props.inputType}
        placeholder={props.placeholder}
        onChange={changeHandler}
      />
      <label
        className={
          props.isValidValue ? "error-message-default" : "error-message"
        }
      >
        {props.errorMessage || "Неверный формат данных"}
      </label>
    </div>
  );
};

export default Input;
