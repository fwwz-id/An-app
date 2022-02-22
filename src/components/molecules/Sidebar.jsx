import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// icons
import {
    BiDotsVerticalRounded,
    BiHome,
    BiBarChart,
    BiPencil,
    BiUserCircle,
    BiHelpCircle,
    BiUserPlus,
    BiLogOutCircle,
    BiBell,
    BiMenu,
} from "react-icons/bi";
import { IoSettings } from "react-icons/io5";

// components
import ButtonIcon from "../atoms/ButtonIcon";
import { logout } from "../../state/auth/auth-services";

// lib / util
import "../../lib/_locale";
import dayjs from "dayjs";

// navigations
const links = [
    {
        path: "/dashboard",
        text: "Home",
        Icon: BiHome,
    },
    {
        path: "/presence",
        text: "Presence",
        Icon: BiPencil,
    },
    {
        path: "/details",
        text: "Details",
        Icon: BiBarChart,
    },
];

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { auth } = useSelector((state) => state);

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout());

        navigate("/");
    };

    const [isExpand, setIsExpand] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    const isExpandOpacityStyle = isExpand ? "opacity-100" : "opacity-0";

    useEffect(() => {
        const time = setInterval(() => {
            setCurrentTime(dayjs().format('dddd, HH:mm:ss |  DD MMMM YYYY'));
        }, 500);

        return () => clearInterval(time);
    }, []);

    return (
        <nav>
            <div className="bg-gray-800 py-4 flex items-center">
                <div className="container flex justify-between md:justify-end">
                    <ButtonIcon
                        className="text-white w-max md:hidden"
                        onClick={() => setIsExpand(true)}
                    >
                        <BiMenu />
                        <span className="text-xs">Menu</span>
                    </ButtonIcon>

                    <div className="flex space-x-2 text-sm text-white">
                        <p>{currentTime}</p>
                    </div>
                </div>
            </div>
            <div
                className={`flex flex-col transition-all duration-300 py-4 text-lg md:text-2xl bg-gray-800 bg-opacity-40 backdrop-blur-sm fixed top-0 left-0 min-h-screen z-50 break-normal overflow-hidden ${
                    isExpand ? "w-[200px]" : "w-0 md:w-14"
                }`}
            >
                <div className="relative h-5">
                    <ButtonIcon
                        className={`absolute cursor-pointer text-trueGray-300 px-3 md:px-5`}
                        onClick={() => setIsExpand(!isExpand)}
                    >
                        <BiDotsVerticalRounded />
                    </ButtonIcon>
                </div>

                <div className="mt-4">
                    {
                        links.map(({ path, text, Icon }, key) => (
                            <NavLink
                                key={key}
                                to={path}
                                style={({ isActive }) =>
                                    isActive
                                        ? { color: "white" }
                                        : { color: "#858585" }
                                }
                                end
                                className="group flex items-center py-2 px-3 md:px-5 transition-all duration-300 hover:bg-sky-600"
                            >
                                <ButtonIcon className="mr-1 text-white">
                                    <Icon />
                                    <span
                                        className={`transition-opacity duration-300 text-sm text-white ${isExpandOpacityStyle}`}
                                    >
                                        {text}
                                    </span>
                                </ButtonIcon>
                            </NavLink>
                        ))
                        // this comment help me to prevent prettier to auto format the text which is hard to read
                    }
                </div>

                {/* Below */}
                <div className="sidebar-footer">
                    <div className="sidebar-footer--button">
                        <ButtonIcon>
                            <BiBell />
                        </ButtonIcon>
                        <div
                            className={`sidebar-footer--button-text ${isExpandOpacityStyle}`}
                        >
                            <p>Notification</p>
                        </div>
                    </div>
                    <div
                        className="sidebar-footer--button"
                        onClick={() => navigate("/helps")}
                    >
                        <ButtonIcon>
                            <BiHelpCircle />
                        </ButtonIcon>
                        <div
                            className={`sidebar-footer--button-text ${isExpandOpacityStyle}`}
                        >
                            <p>Help</p>
                        </div>
                    </div>

                    <div
                        className="sidebar-footer--button"
                        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                        role="button"
                        aria-pressed={isTooltipOpen}
                        aria-label="user-icon-popover"
                    >
                        <ButtonIcon>
                            <BiUserCircle />
                        </ButtonIcon>
                        <div
                            className={`sidebar-footer--button-text ${isExpandOpacityStyle} relative w-full`}
                        >
                            <p>
                                <span className="block font-bold">as</span>
                                <span className="absolute">
                                    {auth.as.username}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`fixed w-32 max-h-full bg-gray-800 shadow-md rounded bg-opacity-40 backdrop-blur-sm text-sm z-[2022] ${
                    isTooltipOpen && isExpand
                        ? "bottom-4 scale-100"
                        : "-bottom-60 scale-0"
                } ${
                    isExpand ? "left-32" : "left-16"
                } transition-all duration-300`}
                aria-expanded={isTooltipOpen}
                aria-labelledby="user-icon-popover"
            >
                <ButtonIcon
                    className="flex flex-row-reverse items-center pl-2 hover:bg-sky-600 text-white w-full justify-end"
                    onClick={() => navigate("/settings")}
                >
                    <p className="cursor-pointer rounded py-2 pl-2 ">
                        Settings
                    </p>
                    <span>
                        <IoSettings />
                    </span>
                </ButtonIcon>
                <ButtonIcon className="flex flex-row-reverse items-center pl-2 hover:bg-sky-600 text-white w-full justify-end">
                    <p className="cursor-pointer rounded py-2 pl-2">
                        Add Account
                    </p>
                    <span>
                        <BiUserPlus />
                    </span>
                </ButtonIcon>
                <ButtonIcon
                    className="flex flex-row-reverse items-center pl-2 hover:bg-sky-600 text-white w-full justify-end"
                    onClick={(e) => handleLogout(e)}
                >
                    <p className="cursor-pointer rounded py-2 pl-2">Log out</p>
                    <span>
                        <BiLogOutCircle />
                    </span>
                </ButtonIcon>
            </div>
        </nav>
    );
}

export default Sidebar;
