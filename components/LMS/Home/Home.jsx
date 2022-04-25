import {
  faBookmark,
  faChartPie,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const Home = () => {
  
  const user = useSelector((state) => state.UserReducer);

  const pieChartIcon = (
    <FontAwesomeIcon
      icon={faChartPie}
      size="lg"
      color="lightGray"
      className={`cursor-pointer hover:text-subheading m-auto`}
    />
  );

  const availableCoursesIcon = (
    <FontAwesomeIcon
      icon={faBookmark}
      size="lg"
      color="lightGray"
      className={`cursor-pointer hover:text-subheading m-auto`}
    />
  );

  const completedCoursesIcon = (
    <FontAwesomeIcon
      icon={faCheckDouble}
      size="lg"
      color="lightGray"
      className={`cursor-pointer hover:text-subheading m-auto`}
    />
  );

  return (
    <div className="relative w-1/2 p-10 flex flex-col border min-h-content bg-blue-50 space-y-4">
      <div className="w-full h-50 border relative">
        <img className="w-full h-full" src="/images/dashboard-content-1.svg" />
        <p className="absolute top-8 left-4 text-skBlue font-bold text-5xl">
          Hi {user.data && `${user.data.firstname}`},
        </p>
        <p className="absolute bottom-1 left-4 text-white text-2xl">
          Welcome back! What will you learn today?
        </p>
      </div>
      <div className="w-full h-20 top-2 flex justify-around relative">
        <div className="h-full w-52 flex bg-white border rounded-2xl">
          <div className="w-1/4 h-full flex items-center">{pieChartIcon}</div>
          <div className="flex flex-col justify-center h-full w-3/4">
            <p className="text-skBlue font-bold text-3xl">20</p>
            <p className="font-semibold text-subheading">Ongoing Courses</p>
          </div>
        </div>
        <div className="h-full w-52 flex bg-white border rounded-2xl">
          <div className="w-1/4 h-full flex items-center">
            {availableCoursesIcon}
          </div>
          <div className="flex flex-col justify-center h-full w-3/4">
            <p className="text-skBlue font-bold text-3xl">6</p>
            <p className="font-semibold text-subheading">Available Courses</p>
          </div>
        </div>
        <div className="h-full w-52 flex bg-white border rounded-2xl">
          <div className="w-1/4 h-full flex items-center">
            {completedCoursesIcon}
          </div>
          <div className="flex flex-col justify-center h-full w-3/4">
            <p className="text-skBlue font-bold text-3xl">1</p>
            <p className="font-semibold text-subheading">Completed Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
