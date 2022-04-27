import CalendarControl from "./CalendarControl";
import CalendarDaysHeader from "./CalendarDaysHeader";
import CalendarWeeksRow from "./CalendarWeeksRow";


import { useHttp } from "../../hooks/http";
import { useState } from "react";

import { useSelector } from "react-redux";
import {
  faClock
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CalendarLayout = (props) => {
  const [date, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [calendarLoading, calendar] = useHttp(
    `/calendar?${date.month ? `month=${date.month}&` : ""}${
      date.year ? `year=${date.year}&` : ""
    }`,
    [date]
  );


  return (
    <div className="w-full h-auto flex flex-col box-border rounded-2xl p-2">
      <CalendarControl date={date} setDate={setDate} />
      <CalendarDaysHeader />
      {calendar &&
        calendar.map((elm, i) => {
          return <CalendarWeeksRow key={i} days={elm} />;
        })}
    
    <div>
    <p className="font-semibold text-skBlue text-sm" >TODAY</p>
    <p className="font-bold text-black text-xl">Strucures of the Earth</p>
    <img className="pt-3" src="/images/structureearth.png"/> 
    <p className="font-semibold text-subjtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
    <div className="flex justify-start">
    <img className="pt-3" src="/images/Group4.png"/>
    <p className="pt-4 pl-4 font-semibold text-subjtext text-xs">30+ joined this course</p>
    </div>
    <div className="pt-4 flex justify-start">
    <img className="pt-4 h-11" src="/images/clock-regular.svg"/>
    <div>
    <p className="pt-3 pl-4 font-bold text-black text-sm">55 mins</p>
    <p className="pl-4 font-semibold text-subjtext text-xs">Duration</p>
    </div>
    
    </div>
    <div className="flex justify-start">
    <img className="pt-4 h-11" src="/images/Vector.png"/>
    <div>
    <p className="pt-3 pl-4 font-bold text-black text-sm">03 lessons</p>
    <p className="pl-4 font-semibold text-subjtext text-xs">Course Outline</p>
    </div>
    </div>

    <div className="pt-10 flex justify-evenly">
    <button class="bg-skBlue h-12 w-40  rounded-full text-white ">Start Course</button>
    <button class="bg-white h-12 w-40  rounded-full text-skBlue border-2 border-skBlue">Reschedule</button>
    </div>
    

    </div>
   

    </div>

  );
};

export default CalendarLayout;
