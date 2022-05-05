import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http";
import { usePostHttp } from "../../hooks/postHttp";
import { DoLogin } from "../../redux/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import NumberField from "../NumberField";
import Select from "../Select";
import InterestComponents from "./InterestComponents";
import SchoolInformationComponents from "./SchoolInformationComponents";

const PersonalInformationComponent = ({
  email, username,
  password, confirmPassword,
  firstName, middleName, lastName,
  month, setMonth,
  day, setDay,
  year, setYear,
  gender, setGender,
  mobileno, setMobileNo,
  school, setSchool,
  other, setOther,
  gradeLevel, setGradeLevel,
  favoriteSubject, setFavoriteSubject,
  careerGoal, setCareerGoal,
  setForm,
}) => {  

  const [years, setYears] = useState([
    "1990", "1991", "1992", "1993", "1994","1995", "1996", "1997", 
    "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005",
    "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", 
    "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", 
  ]);

  const [months, setMonths] = useState([
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]);

  // const [month, setMonth] = useState("");
  // const [year, setYear] = useState("");
  // const [day, setDay] = useState("");
  const [monthLong, setMonthLong] = useState(0);

  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const [createAccount, setCreateAccount] = useState(false);
  const [disable, setDisable] = useState(true);

  const [daysLoading, days] = useHttp(`/calendar/days?monthlong=${monthLong}`, [monthLong]);

  useEffect(() => {
    if(year && month)
      setMonthLong(new Date(year, month + 1, 0).getDate() + 1)
  },[year, month])

  useEffect(() => {
    if ((school != 1 || (school == 1 && other)))
      setDisable(false);
    if (school == 0)
      setDisable(true);
    if (gradeLevel == 0)
      setDisable(true);
  }, [school, other, gradeLevel]);

  useEffect(()=>{
    if(favoriteSubject && 
      favoriteSubject.match(/^[A-Za-z ]*/)[0] == favoriteSubject && 
      careerGoal && 
      careerGoal.match(/^[A-Za-z ]*/)[0] == careerGoal)
      setDisable(false);
    else
      setDisable(true);
  },[favoriteSubject, careerGoal])

  useEffect(() => {
    if (mobileno.match(/^[0-9]*/) == mobileno && mobileno != "")
      setDisable(true);
    if (mobileno.length == 11)
      setDisable(false);
    if (mobileno.match(/^[0-9]*/) <= 1)
      setDisable(true); 
    if (gender == 1)
      setDisable(false);
    if (gender == 0)
      setDisable(true);
  }, [gender, mobileno]);

  useEffect(() => {
    if (year != "" &&
    month != "" &&
    day != "")
      setDisable(true);
    else
      setDisable(false);
  }, [year, month, day]);

  useEffect(() => {
    if (username && 
      password &&
      email &&
      firstName && lastName && middleName &&
      typeof month === "number" &&
      typeof day === "number" &&
      typeof year === "number" &&
      gender &&
      school &&
      gradeLevel &&
      favoriteSubject &&
      careerGoal)
      setDisable(false);
    else
      setDisable(true);
  });

  const [creatingAccount, userData] = usePostHttp(
    !user.isLogin && createAccount
      ? {
          username,
          email,
          password,
          firstName,
          middleName,
          lastName,
          mobileno,
          gender,
          dateofbirth: `${year}-${month + 1}-${day}`,
          school,
          other,
          gradeLevel,
          favoriteSubject,
          careerGoal,
        }
      : null,
    "/register/student"
  );

  const [creatingAuthAccount, userAuthData] = usePostHttp(
    user.isLogin && !user.data.username && createAccount
      ? {
          studentid: user.data.id,
          userid: user.data.userid,
          username,
          firstName,
          middleName,
          lastName,
          mobileno,
          gender,
          dateofbirth: `${year}-${month + 1}-${day}`,
          school,
          other,
          gradeLevel,
          favoriteSubject,
          careerGoal,
        }
      : null,
    "/register/auth/student"
  );

  useEffect(() => {
    if (userData.success) {
      dispatch(DoLogin(true, userData.result[0]));
      setForm("account-verification");
      // router.push('https://drive.google.com/drive/folders/1JAKiumWmxsYbFoz5p97DtG9y3mzUDYxy');
    }
  }, [userData]);

  useEffect(() => {
    if (userAuthData.success) {
      dispatch(DoLogin(true, userAuthData.result));
      setForm("account-verification");
      // router.push('https://drive.google.com/drive/folders/1JAKiumWmxsYbFoz5p97DtG9y3mzUDYxy');
    }
  }, [userAuthData]);

    
  return (
    <>
      <label className="lg:w-full md:w-3/4 sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 text-left text-lg mt-2 font-semibold text-subheading">
        Date of Birth
      </label>
      {/*<NumberField
        id="year"
        classNames="lg:w-full md:w-full sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 mt-2 rounded-xl border border-lightGray placeholder-lightGray"
        value={year}
        setValue={setYear}
        placeholder="Year"
      />*/}
      <select
        id="year"
        className="w-full xs:h-8 xxs:h-8 rounded-xl border border-lightGray mt-2 text-lightGray"
        defaultValue={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">------ Year ------</option>
        {years.map((years, value) => {
          return (
            <option
              key={years}
              value={years}
            >
              {[years]}
            </option>
          );
        })}
      </select>
      
      <select
        id="month"
        className="w-full xs:h-8 xxs:h-8 rounded-xl border border-lightGray mt-2 text-lightGray"
        defaultValue={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="">------ Month ------</option>
        {months.map((month, index) => {
          return (
            <option
              key={index}
              value={index}
            >
              {months[index]}
            </option>
          );
        })}
      </select>
      <select
        id="day"
        className="w-full xs:h-8 xxs:h-8 rounded-xl border border-lightGray mt-2 text-lightGray"
        defaultValue={day}
        onChange={(e) => setDay(e.target.value)}
      >
        <option value="">------ Day ------</option>
        {days && days.map((day, index) => {
          return (
            <option
              key={index}
              value={index+1}
            >
              {index+1}
            </option>
          );
        })}
      </select>
      <label className="lg:w-full md:w-3/4 sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 text-left text-lg mt-2 font-semibold text-subheading">
        Gender
      </label>
      <div
        className="lg:w-full md:w-3/4 sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 mt-2 text-subheading"
        onChange={(e) => setGender(e.target.value)}
      >
        <input type="radio" name="gender" value="male"/> Male &nbsp; &nbsp;
        <input type="radio" name="gender" value="female"/> Female
      </div>
      <NumberField
        id="mobileno"
        classNames="lg:w-full md:w-full sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 mt-2 rounded-xl border border-lightGray placeholder-lightGray"
        value={mobileno}
        setValue={setMobileNo}
        placeholder="Mobile Number (11 digits)"
      />
      <br />
      <label className="lg:w-full md:w-3/4 sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 text-left text-lg mt-2 font-semibold text-subheading">
        School Information
      </label>
      <SchoolInformationComponents
        school={school}
        other={other}
        gradeLevel={gradeLevel}
        setSchool={setSchool}
        setOther={setOther}
        setGradeLevel={setGradeLevel}
      />
      <br />
      <label className="lg:w-full md:w-3/4 sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 text-left text-lg mt-2 font-semibold text-subheading">
        Interest
      </label>
      <InterestComponents
          favoriteSubject={favoriteSubject}
          careerGoal={careerGoal}
          setFavoriteSubject={setFavoriteSubject}
          setCareerGoal={setCareerGoal}
      />

      <button
        disabled={disable ? true : false}
        onClick={() => {
          setCreateAccount(true);
        }}
        className="bg-blue-500 text-white text-xl font-semibold lg:w-full md:w-full sm:w-full xs:w-11/12 xxs:w-11/12 lg:mt-10 md:mt-10 sm:mt-2 py-3 rounded-full disabled:opacity-50"
      >
        Submit
      </button>
    </>
  );
};

export default PersonalInformationComponent;