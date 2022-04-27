import { useSelector } from "react-redux";
import {
  faBookmark,
  faChartPie,
  faCheckDouble,
  faPlay
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const user = useSelector((state) => state.UserReducer);
  const pieChartIcon = (
    <FontAwesomeIcon
      icon={faChartPie}
      size="2x"
      color="lightGray"
      className={`cursor-pointer hover:text-subheading m-auto`}
    />
  );

  const availableCoursesIcon = (
    <FontAwesomeIcon
      icon={faBookmark}
      size="2x"
      color="lightGray"
      className={`cursor-pointer hover:text-subheading m-auto`}
    />
  );

  const completedCoursesIcon = (
    <FontAwesomeIcon
      icon={faCheckDouble}
      size="2x"
      color="lightGray"
      className={`cursor-pointer hover:text-subheading m-auto`}
    />
  );

  const playIcon = (
    <FontAwesomeIcon
      icon={faPlay}
      size="1x"
      color="white"
      className={`cursor-pointer hover:text-subheading m-auto`}
    />
  );

  return (
    <div className="relative w-1/2 p-10 flex flex-col border min-h-content bg-blue-50 space-y-4">
      <div className="w-full h-72 border relative">
        <img className="w-full h-full" src="/images/dashboard-content-1.svg" />
        <p className="absolute top-8 left-8 text-skBlue font-semibold text-5xl">
          Hi {user.data && `${user.data.firstname}`},
        </p>
        <p className="absolute bottom-20 left-8 text-white text-2x2 ">
          Welcome Back! What will you learn today?
        </p>
      </div>
      <div className=" flex justify-evenly ">
        <div className="h-84 w-227 flex bg-white border rounded-2xl">
          <div className="w-1/3 h-full flex items-center">{pieChartIcon}</div>
          <div className="flex flex-col justify-center h-full w-3/4">
            <p className="text-skBlue font-bold text-4xl">20</p>
            <p className="font-semibold text-subheading">Ongoing Courses</p>
          </div>
        </div>
        <div className="h-84 w-227 flex bg-white border rounded-2xl">
          <div className="w-1/3 h-full flex items-center">
            {availableCoursesIcon}
          </div>
          <div className="flex flex-col justify-center h-full w-3/4">
            <p className="text-skBlue font-bold text-4xl">6</p>
            <p className="font-semibold text-subheading">Available Courses</p>
          </div>
        </div>
        <div className="h-84 w-227 flex bg-white border rounded-2xl">
          <div className="w-1/3 h-full flex items-center">
            {completedCoursesIcon}
          </div>
          <div className="flex flex-col justify-center h-full w-3/4">
            <p className="text-skBlue font-bold text-4xl">1</p>
            <p className="font-semibold text-subheading">Completed Courses</p>
          </div>
        </div>
      </div>
      
      <div> <p className="font-semibold pb-4">My Modules</p>
      <div className="flex flex-row justify-evenly">

      <div className="box-border h-40 w-1/2 p-3 m-2 bg-M1vio border rounded-3xl ">
          <div className=" relative flex-row justify-center">
          <p className="pt-2 text-white font-semibold">Mode</p>
          <img className="pt-1" src="/images/Line.svg" /> 
          <p className="absolute top-0 right-0 text-white font-semibold text-5xl">01</p>
          <img className="pt-8 w-full h-full" src="/images/Rectangle 5 Copy.svg" />
          <p className="pt-4 pl-36 text-white font-semibold text-xs">44% Complete</p>
          <div className="absolute -bottom-11 left-1 h-16 w-16">{playIcon}</div>
            
          </div>
        </div>
        <div className="box-border h-40 w-1/2 p-3 m-2 bg-M2blue border rounded-3xl ">
          <div className=" relative flex-row justify-center">
          <p className="pt-2 text-white font-semibold">Mode</p>
          <img className="pt-1" src="/images/Line.svg" /> 
          <p className="absolute top-0 right-0 text-white font-semibold text-5xl">02</p>
          <img className="pt-8 w-full h-full" src="/images/Rectangle 5 Copy.svg" />
          <p className="pt-4 pl-36 text-white font-semibold text-xs">44% Complete</p>
          <div className="absolute -bottom-11 left-1 h-16 w-16">{playIcon}</div>
            
          </div>
        </div>
        <div className="box-border h-40 w-1/2 p-3 m-2 bg-M3green border rounded-3xl ">
          <div className=" relative flex-row justify-center">
          <p className="pt-2 text-white font-semibold">Mode</p>
          <img className="pt-1" src="/images/Line.svg" /> 
          <p className="absolute top-0 right-0 text-white font-semibold text-5xl">03</p>
          <img className="pt-8 w-full h-full" src="/images/Rectangle 5 Copy.svg" />
          <p className="pt-4 pl-36 text-white font-semibold text-xs">44% Complete</p>
          <div className="absolute -bottom-11 left-1 h-16 w-16">{playIcon}</div>
          
            
            
          </div>
        </div>
        
      </div>
      </div>
        <div>
          <p className="font-semibold pt-3 pb-5 ">My Subjects</p>
          <div className="flex justify-start">
          <div className="flex-row w-1/3 m-1">
          <img className="" src="/images/earthsci.png"/> 
          <p className="font-semibold text-subjtext font-semibold pt-5 pb-5 pl-24">Earth Science</p>
          </div>
          <div className="flex-row w-1/3 m-1">
          <img className="" src="/images/bio.png"/> 
          <p className="font-semibold text-subjtext pt-5 pb-5 pl-28">Biology</p>
          </div>
          </div>
      </div>
      <div>
      <p className="font-semibold pt-5 pb-5 ">Recommended for you</p>
      <div className="flex justify-start">
          <div className="flex-row w-1/3  m-1">
          <img className="" src="/images/science.png"/> 
          <p className="font-semibold text-subjtext pt-5 pb-5 pl-28">Science</p>
          </div>
          <div className="flex-row w-1/3 m-1">
          <img className="" src="/images/tech1.png"/> 
          <p className="font-semibold text-subjtext pt-5 pb-5 pl-24">Technology</p>
          </div>
          <div className="flex-row w-1/3 m-1">
          <img className="" src="/images/tech2.png"/> 
          <p className="font-semibold text-subjtext pt-5 pb-5 pl-20">Technology</p>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
