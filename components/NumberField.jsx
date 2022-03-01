import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FieldAlert from "./FieldAlert";

export default function NumberField({
  id,
  value,
  setValue,
  placeholder,
  classNames,
  disabled,
}) {
  const [invalidInput, setInvalidInput] = useState(false);
  const [incompleteInput, setIncompleteInput] = useState(false);
  const [overInput, setOverInput] = useState(false);

  useEffect(() => {
    if (value.match(/^[0-9]*/) != value) {
      setInvalidInput(true);
     } else setInvalidInput(false);
  }, [value]);


  useEffect(() => {
    if (value.length <= 11) {
      setOverInput(false);
    } else setOverInput(true);
  }, [value]);


  useEffect(() => {
    if (value.length == 0) {
      setOverInput, setIncompleteInput(false);
    }
  }, [value]);
 

  return (
    <>
      <input
        id={id}
        type="text"
        className={classNames}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        
      />
      {invalidInput && (
        <FieldAlert
          classNames="w-full mt-2 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          message="Only numbers are accepted in this input."
        />
      )}

      {overInput && (
        <FieldAlert
          classNames="w-full mt-2 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          message="Input exceeds."
        />
      )}
    </>
  );
}
