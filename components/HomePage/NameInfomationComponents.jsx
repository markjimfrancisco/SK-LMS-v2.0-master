import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http";
import NumberField from "../NumberField";
import Select from "../Select";
import UsernameField from "../UsernameField";
import EmailField from "../EmailField";
import TextField from "../TextField";
import ConfirmPasswordInput from "../ConfirmPasswordInput";
import PasswordInput from "../PasswordInput";
import { useDispatch, useSelector } from "react-redux";

const NameInfomationComponents = ({
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  lastName,
  setLastName,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  setStep
}) => {

  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const [validEmail, setValidEmail] = useState(false);
  const [userAgree, setUserAgree] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (
      username != "" &&
      password != "" &&
      email != "" &&
      password == confirmPassword &&
      userAgree &&
      firstName &&
      middleName &&
      lastName &&
      firstName.match(/^[A-Za-z ]*/)[0] == firstName &&
      middleName.match(/^[A-Za-z ]*/)[0] == middleName &&
      lastName.match(/^[A-Za-z ]*/)[0] == lastName &&
      firstName.length >= 2 &&
      middleName.length >= 2 &&
      lastName.length >= 2
    ) {
      setDisable(false);
    } else setDisable(true);

    if (
      username &&
      firstName &&
      middleName &&
      lastName &&
      userAgree
    )
      setDisable(false);
    else setDisable(true);
  });

  return (
    <>
      <TextField
        id="firstname"
        classNames="lg:w-full md:w-full sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 mt-3 rounded-xl border border-lightGray placeholder-lightGray"
        placeholder="First Name"
        value={firstName}
        setValue={setFirstName}
        alert={true}
      />
      <TextField
        id="middlename"
        classNames="lg:w-full md:w-full sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 mt-3 rounded-xl border border-lightGray placeholder-lightGray"
        placeholder="Middle Name"
        value={middleName}
        setValue={setMiddleName}
        alert={true}
      />
      <TextField
        id="lastname"
        classNames="lg:w-full md:w-full sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 mt-3 rounded-xl border border-lightGray placeholder-lightGray"
        placeholder="Last Name"
        value={lastName}
        setValue={setLastName}
        alert={true}
      />

      {!user.isLogin && (
        <EmailField
          classNames="lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 mt-3 xs:h-8 xxs:h-8 rounded-xl border border-lightGray placeholder-lightGray"
          value={email}
          setValue={setEmail}
          placeholder="Email Address"
          to={true}
          endpoint={"/register/verify/email?value="}
          alert={true}
          errorMessage="Email already been taken!"
          setValidEmail={setValidEmail}
        />
      )}

      <UsernameField
        classNames="lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 mt-3 xs:h-8 xxs:h-8 rounded-xl border border-lightGray placeholder-lightGray"
        value={username}
        setValue={setUsername}
        placeholder="Username"
      />

      {!user.isLogin && (
        <>
          <PasswordInput
            wrapperClassName="lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 mt-2 xs:h-8 xxs:h-8 flex rounded-xl"
            textFieldClassName="m-auto xs:h-8 xxs:h-8 border-lightGray rounded-xl placeholder-lightGray"
            alert={true}
            alertClassName="lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 lg:mt-2 md:mt-2 sm:mt-4 xs:mt-4 xxs:mt-4 px-4 py-3 rounded"
            alertValidStyle="border border-green-400 text-green-700"
            alertInvalidStyle="border border-red-400 text-red-700"
            iconTop={"top-1"}
            classNames="lg:w-full md:w-full sm:w-full xs:w-11/12 md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 mt-3 rounded-xl border border-lightGray placeholder-lightGray"
            value={password}
            setValue={setPassword}
            placeholder="Password"
          />
          <ConfirmPasswordInput
            wrapperClassName="lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 mt-2 xs:h-8 xxs:h-8 flex rounded-xl"
            textFieldClassName="xs:h-8 xxs:h-8 m-auto border-lightGray rounded-xl placeholder-lightGray"
            classNames="lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 mt-3 rounded-xl border border-lightGray placeholder-lightGray"
            iconTop={"top-1"}
            value={confirmPassword}
            setValue={setConfirmPassword}
            password={password}
            placeholder="Re-enter your password"
          />
        </>
      )}
      <div className="lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 mt-3 lg:mb-0 md:mb-0 sm:mb-4 xs:mb-4 xs:h-8 xxs:h-8 flex items-center space-x-2">
        <input
          id="agree"
          onChange={(e) => setUserAgree(e.target.checked)}
          type="checkbox"
          name="useragree"
        />
        <label
          for="useragree"
          className="text-subheading xs:text-sm xxs:text-sm"
        >
          I agree to the&nbsp;
          <a className="text-skBlue hover:text-skBlueInactive" href="/terms-and-policy?terms=true" target="_blank">
            Terms of Service & Privacy Policy
          </a>
        </label>
      </div>

      <button
        disabled={disable ? true : false}
        onClick={() => {
          setStep(2);
        }}
        className="bg-blue-500 text-white text-xl font-semibold w-full mt-3 lg:py-3 1080:py-3 reno:py-3 sm:py-2 xs:py-2 xxs:py-2 rounded-full disabled:opacity-50"
      >
        Sign Up
      </button>
    </>
  );
};

export default NameInfomationComponents;
