import { useState } from "react";
import { useNavigate } from "react-router";

import ButtonIcon from "../components/atoms/ButtonIcon";
import Input from "../components/atoms/Input";

import Select from "../components/molecules/Select";
import Options from "../components/atoms/Options";

import { BiUserPlus, BiArrowBack } from "react-icons/bi";
import { api } from "../config/axios/apiClient";
import Sweetalert from "../components/molecules/Sweetalert";

function Register() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [dialogText, setDialogText] = useState("");
    const [dropdownValue, setDropdownValue] = useState("role");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let role;

        if (dropdownValue.toLowerCase() === "koordinator") {
            role = "moderator";
        } else if (dropdownValue.toLowerCase() === "pengampu") {
            role = "mentor";
        } else {
            setDialogText("You must switch valid role");
            setIsOpen(true);
            return;
        }

        const data = { username, password, role };

        if (password === confirmPass) {
            api({ method: "POST", url: `/register`, data }).then((response) => {
                setDialogText(response.data.message);
                setIsOpen(true);
            });
        } else {
            setDialogText("Password doesn't match");
            setIsOpen(true);
        }
    };

    const handleDialog = (e) => {
        e.preventDefault();
        setIsOpen(false);
    };

    const handleBack = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            {isOpen &&  <Sweetalert
                message={dialogText}
                isOpen={isOpen}
                className="flex items-center p-3 space-x-4"
            >
                <button
                    className="btn btn-primary"
                    onClick={(e) => handleDialog(e)}
                >
                    Oke
                </button>
            </Sweetalert> }
            <form
                className="flex flex-col w-11/12 md:w-[400px] space-y-2 bg-gray-800 p-8"
                onSubmit={(e) => handleSubmit(e)}
            >
                <ButtonIcon
                    className="btn btn-primary max-w-max my-1"
                    onClick={(e) => handleBack(e)}
                >
                    <BiArrowBack />
                    <span>back</span>
                </ButtonIcon>
                <h1 className="text-3xl mb-3 text-white">Register</h1>
                <Input
                    type="text"
                    placeholder="Username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => setConfirmPass(e.target.value)}
                />
                <Select value={dropdownValue} setValue={setDropdownValue}>
                    <Options value="Koordinator" />
                    <Options value="Pengampu" />
                </Select>
                <div>
                    <ButtonIcon className="btn btn-primary">
                        <BiUserPlus />
                        <span>Register</span>
                    </ButtonIcon>
                </div>
            </form>
        </div>
    );
}

export default Register;
