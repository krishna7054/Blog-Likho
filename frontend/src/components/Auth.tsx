import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupType } from "krishna007-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Button from "./Button";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInput] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/blogs"); // Redirect if already logged in
        }
    }, [navigate]);

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
            );
            const jwt = response.data;
            localStorage.setItem("token", JSON.stringify(jwt));
            navigate("/blogs");
        } catch (e) {
            window.alert("Request failed. Please try again.");
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col w-full">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold">Create an account</div>
                        <div className="text-slate-500 text-center text-md">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/" : "/signin"}>
                                {type === "signin" ? "SignUp" : "SignIn"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === "signup" ? (
                            <LabelledInput
                                label="Username"
                                placeholder="John"
                                onChange={(e) =>
                                    setPostInput({ ...postInputs, name: e.target.value })
                                }
                            />
                        ) : null}
                        <LabelledInput
                            label="Email"
                            placeholder="John@gmail.com"
                            onChange={(e) =>
                                setPostInput({ ...postInputs, email: e.target.value })
                            }
                        />
                        <LabelledInput
                            label="Password"
                            placeholder="John1234"
                            type="password"
                            onChange={(e) =>
                                setPostInput({ ...postInputs, password: e.target.value })
                            }
                        />
                        <Button onClick={sendRequest} text={type === "signup" ? "Sign Up" : "Sign In"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, type = "text", onChange }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-black font-semibold pt-4">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
