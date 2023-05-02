import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FieldAlert from "./FieldAlert";

export default function TextField({
  id,
  value,
  setValue,
  classNames,
  placeholder,
  alert,
  disabled
}) {
  const [invalidInput, setInvalidInput] = useState(false);
  const [incompleteInput, setIncompleteInput] = useState(false);

  useEffect(() => {
    if (value.match(/^[A-Za-z ]*/)[0] != value) {
      setInvalidInput(true);
    } else setInvalidInput(false);
  }, [value]);

  useEffect(() => {
    if (value.length == 1) {
      setIncompleteInput(true);
    } else setIncompleteInput(false);
  }, [value]);

  return (
    <>
      <input
        id={id}
        type="text"
        maxLength={50} //Added
        className={classNames}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled ? disabled : false}
      />
      {alert && invalidInput && (
        <FieldAlert
          classNames="w-full mt-2 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          message="Only alphabet are accepted in this input."
        />
      )}

      {alert && incompleteInput && (
        <FieldAlert
          classNames="w-full mt-2 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          message="Minimum of 2 letters are accepted in this input."
        />
      )} 
    </>
  );
}
