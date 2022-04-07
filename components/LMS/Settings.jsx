const Settings = () => {
  return (
    <div className="box-border h-screen w-full bg-blue-50 flex flex-col py-2 space-y-2">
        <div className="box-border w-full bg-white h-auto flex flex-col p-4 space-y-4">
            <h4 className="text-xl font-bold text-heading">Settings</h4>
            <div className="box-border w-full h-10 border-b-1 flex flex-row">
                <div className="w-1/2 h-full border-b-2 border-skBlue">
                    <h4 className="text-subheading text-center">Password</h4>
                </div>
                <div className="w-1/2 h-full">
                    <h4 className="text-subheading text-center">Notifications</h4>
                </div>
            </div>
            <h4 className="text-subheading">Change Password</h4>

            <br />
            <PasswordInput
                wrapperClassName="w-full mt-2 flex rounded-xl"
                textFieldClassName="m-auto border-lightGray rounded-xl placeholder-lightGray"
                classNames="lg:w-full md:w-full sm:w-full xs:w-3/4 xxs:w-3/4 mt-2 rounded-xl border border-lightGray placeholder-lightGray"
                iconTop={"top-2"}
                value={password}
                setValue={setPassword}
                placeholder="Current Password"
            />
            <br />
            <PasswordInput
                wrapperClassName="w-full mt-2 flex rounded-xl"
                textFieldClassName="m-auto border-lightGray rounded-xl placeholder-lightGray"
                classNames="lg:w-full md:w-full sm:w-full xs:w-3/4 xxs:w-3/4 mt-2 rounded-xl border border-lightGray placeholder-lightGray"
                iconTop={"top-2"}
                value={password}
                setValue={setPassword}
                placeholder="New Password"
            />
            <br />
            <ConfirmPasswordInput
                wrapperClassName="lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 mt-2 xs:h-8 xxs:h-8 flex rounded-xl"
                textFieldClassName="xs:h-8 xxs:h-8 m-auto border-lightGray rounded-xl placeholder-lightGray"
                classNames="lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 mt-2 rounded-xl border border-lightGray placeholder-lightGray"
                iconTop={"top-1"}
                value={confirmPassword}
                setValue={setConfirmPassword}
                password={password}
                placeholder="Re-enter your password"
            />
            <br />
            <button
                disabled={disable ? true : false}
                onClick={() => {
                setCreateAccount(true);
                }}
                className="bg-blue-500 text-white text-xl font-semibold lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 lg:mt-10 md:mt-10 sm:mt-2 py-3 rounded-full disabled:opacity-50"
            >
                Change Password
            </button>
            
        </div>
    </div>
  );
};

export default Settings;
