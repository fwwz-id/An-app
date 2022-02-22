import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Sweetalert from "../components/molecules/Sweetalert";
import ButtonIcon from "../components/atoms/ButtonIcon";
import Input from "../components/atoms/Input";

import { BiLogInCircle, BiUserPlus } from "react-icons/bi";
import { login } from "../state/auth/auth-services";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { auth } = useSelector((state) => state);

    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const payload = { username, password };

        dispatch(login("POST", payload));
    };

    useEffect(() => {
        if (!auth.isLoading && auth.isError) {
            setIsOpen(true);
        }
    }, [auth.isLoading, auth.isError]);

    return (
        <section className="h-screen w-screen flex justify-center items-center">
            {isOpen && (
                <Sweetalert
                    className="p-3 space-y-4"
                    message="invalid username and password combination"
                    isOpen={true}
                >
                    <ButtonIcon
                        className="btn btn-primary"
                        onClick={() => setIsOpen(false)}
                    >
                        <span>Oke</span>
                    </ButtonIcon>
                </Sweetalert>
            )}
            <div className="w-11/12 sm:w-6/12 lg:w-[30rem] shadow-md rounded p-6 sm:p-8 bg-gray-800">
                <h1 className="text-3xl mb-3 text-white">Login</h1>
                <form className="space-y-3" onSubmit={(e) => handleLogin(e)}>
                    <Input
                        type="text"
                        placeholder="Username"
                        size="text-xs sm:text-sm"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        size="text-xs sm:text-sm"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex space-x-3">
                        <ButtonIcon className="btn btn-primary flex items-center">
                            <span className="mt-[0.15rem]">
                                <BiLogInCircle />
                            </span>
                            <span className="text-xs sm:text-sm ml-1">Login</span>
                        </ButtonIcon>
                        <ButtonIcon
                            className="btn btn-outline-primary flex items-center"
                            onClick={() => navigate("/register")}
                        >
                            <span className="mt-[0.15rem]">
                                <BiUserPlus />
                            </span>
                            <span className="text-xs sm:text-sm ml-1">Register</span>
                        </ButtonIcon>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
