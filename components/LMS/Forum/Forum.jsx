import { useSelector } from "react-redux";

const Forum = () => {

    const user = useSelector((state) => state.UserReducer);

    return (
        <div className="relative w-1/2 py-10 flex-row border min-h-content bg-blue-50 space-y-4">
            <div className="border border-box h-10">
                <button className="flex-row w-20 h-10 space-x-4 text-sm text-heading">My Post</button>
                <button className="flex-row w-20 h-10 space-x-4 text-sm text-heading">Question</button>
                <button className="flex-row w-20 h-10 space-x-4 text-sm text-heading">Date</button>
                <button className="flex-row w-20 h-10 space-x-4 text-sm text-heading">Popular</button>
                <button className="relative left-80 w-20 h-10 space-x-4 text-sm text-skBlue">Clear Filters</button>
            </div>
            <div className="border border-box rounded-md">
                <img className= "w-full" src="/images/dashboard-content-1.svg" />
                <p className="absolute top-28 left-8 text-skBlue font-bold text-3xl">
                    Learn to Play.
                    <br />
                    Play to Learn.
                </p>
            </div>
            <div className="border border-box h-full rounded-md bg-white">
                <div className="group relative flex space-x-2">
                    <img className="relative left-8 w-16 h-16 top-2"  src="/images/avatar.png" />
                    <div className="relative top-4 left-1">
                        <p className="flex px-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        <p className="flex px-10 text-sm">{user.data && `${user.data.firstname} ${user.data.lastname}`}, April 5, 2022</p>
                        <br />
                        <p className="flex px-10 text-sm text-lightGray">
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                           ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                           laboris nisi ut aliquip ex ea commodo consequat. 
                        </p>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
            <div className="relative box-border min-h-content flex flex-row flex-nowrap items-stretch justify-center">
            <div className="box-border w-full max-w-full flex-nowrap items-start relative flex flex-row justify-around">
                <div className="box-border w-80 bg-white h-full flex flex-row">
                    <button className="border border-box border-transparent w-full h-10 text-sm text-heading">
                        Subject Expert
                    </button>
                    <button className="border border-box border-transparent w-full h-10 space-x-4 text-sm text-heading">
                        All Expert
                    </button>
                    {/* <div className="relative items-center">
                        <button className="text-center rounded-full bg-skBlue font-bold xl:text-xl lg:text-xl reno:text-xl md:text-md sm:text-xl xs:text-xl xxs:text-xl text-white py-4 px-12">
                            Ask Question
                        </button>
                    </div> */}
                </div>
            </div> 
        </div>     
    </div>
    );
};
export default Forum;