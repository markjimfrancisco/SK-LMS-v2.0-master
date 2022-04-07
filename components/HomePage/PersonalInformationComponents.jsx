import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http";
import NumberField from "../NumberField";
import Select from "../Select";

const PersonalInformationComponent = ({
  month,
  setMonth,
  day,
  setDay,
  year,
  setYear,
  gender,
  setGender,
  mobileno,
  setMobileNo,
  setStep,
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
  const [disable, setDisable] = useState(true);

  const [daysLoading, days] = useHttp(`/calendar/days?monthlong=${monthLong}`, [monthLong]);

  useEffect(() => {
    if (mobileno.match(/^[0-9]*/) == mobileno && mobileno != "" && gender)
      setDisable(true);
    if (mobileno.length == 11)
      setDisable(false);
    if (mobileno.match(/^[0-9]*/) <= 1)
      setDisable(true); 
  }, [gender, mobileno]);

  useEffect(() => {
    if(year && month)
      setMonthLong(new Date(year, month + 1, 0).getDate() + 1)
  },[year, month])
    

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
        <input type="radio" name="gender" value="male" /> Male &nbsp; &nbsp;
        <input type="radio" name="gender" value="female" /> Female
      </div>
      <NumberField
        id="mobileno"
        classNames="lg:w-full md:w-full sm:w-full xs:w-full xxs:w-full xs:h-8 xxs:h-8 mt-2 rounded-xl border border-lightGray placeholder-lightGray"
        value={mobileno}
        setValue={setMobileNo}
        placeholder="Mobile Number (11 digits)"
      />
      <button
        disabled={disable ? true : false}
        onClick={() => {
          setStep(3);
        }}
        className="bg-blue-500 text-white text-xl font-semibold w-full mt-2 lg:py-3 1080:py-3 reno:py-3 sm:py-2 xs:py-2 xxs:py-2 rounded-full disabled:opacity-50"
      >
        Next
      </button>
    </>
  );
};

export default PersonalInformationComponent;