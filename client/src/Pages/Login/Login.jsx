import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo/Logo";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Login = () => {

    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    //States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLogging, setIsLogging] = useState(false);

    const { loginUser, resetUserPassword } = useContext(UserContext);

    //Form submit
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        setIsLogging(true);
        loginUser(data?.email, data?.password)
            .then(response => {
                const user = response?.user;
                if (!user?.emailVerified) {
                    setIsLogging(false);
                    return toast.error("Please verify your email before login!");
                }

                setIsLogging(false);
                navigate("/");

            })
            .catch(error => {
                if (error?.message === "Firebase: Error (auth/invalid-credential).") {
                    setIsLogging(false);
                    return toast.error("Invalid user credentials!");
                }
                setIsLogging(false);
                toast.error(error?.message);
            });

    }



    //Handle forgot password
    const handleForgotPassword = () => {
        Swal.fire({
            title: "Find your account.",
            text: "Enter email address to find your account.",
            input: "text",
            confirmButtonText: "Send reset email",
            inputPlaceholder: "Enter your email",
        })
            .then(result => {
                if (result.isConfirmed) {
                    const value = result?.value;

                    //Check for empty input
                    if (!value) {
                        return Swal.fire({
                            title: "Error",
                            text: "Please provide an email address.",
                            icon: "error"
                        })
                    }

                    //Check for email exist
                    axiosPublic.get(`/user/exist?email=${value}`)
                        .then(res => {
                            if (!res.data) {
                                return Swal.fire({
                                    title: "Error",
                                    text: "User not found!",
                                    icon: "error"
                                })
                            }
                            resetUserPassword(value)
                                .then(() => {
                                    Swal.fire({
                                        title: "Sent!",
                                        text: " A password reset email has been sent to your given email address!",
                                        icon: "success"
                                    })
                                })

                        })



                }
            })
    }



    return <div className=" min-h-screen bg-[#ecf0f3] lg:bg-transparent flex justify-center items-center">
        <div className="lg:w-4/12 p-4 lg:p-10 lg:bg-[#ecf0f3] lg:shadow-neumorphic rounded-xl">

            <div >
                <Logo />
                <hr className="border-b-2 border-b-gray-300 mt-4" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="mt-5">
                    <label className="ml-4 font-medium mb-2 block" htmlFor="email">Email*</label>
                    <div className="relative shadow-inputShadow w-full flex items-center rounded-full px-2">
                        <span className="relative left-3 text-gray-500 text-xl"><MdOutlineEmail /></span>
                        <input {...register("email", { required: true })} className="w-full py-3 px-5 rounded-full bg-transparent outline-none font-bold placeholder:font-normal" type="email" name="email" id="email" placeholder="Enter your email" />
                    </div>
                    {errors.email?.type === "required" && <p className="text-sm font-semibold text-red-500 ml-4">This field is required!</p>}
                </div>


                <div className="mt-5">
                    <label className="ml-4 font-medium mb-2 block" htmlFor="password">Password*</label>
                    <div className="relative shadow-inputShadow w-full flex items-center rounded-full px-2">
                        <span className="relative left-3 text-gray-500 text-xl"><RiLockPasswordLine /></span>
                        <input {...register("password", { required: true, minLength: 6 })} className="w-full py-3 px-5 rounded-full bg-transparent outline-none font-bold placeholder:font-normal" type={isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder="******" />
                        <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-3 text-xl text-gray-500 cursor-pointer">
                            {
                                isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />
                            }
                        </span>
                    </div>
                    {errors.password?.type === "required" && <p className="text-sm font-semibold text-red-500 ml-4">This field is required!</p>}
                    {errors.password?.type === "minLength" && <p className="text-sm font-semibold text-red-500 ml-4">Password should be at least 6 character!</p>}
                </div>

                <p onClick={handleForgotPassword} className="mt-3 text-sm ml-4 cursor-pointer hover:underline">Forgot password?</p>


                <div className="mt-5">
                    <button disabled={isLogging} className="w-full bg-green-700 hover:bg-green-600 text-white  font-bold uppercase shadow-buttonShadow py-3 rounded-full">
                        {isLogging ? <div className="flex gap-2 items-center justify-center">
                            <span>Login</span>
                            <RotatingLines
                                visible={true}
                                height="20"
                                width="20"
                                strokeWidth="5"
                                strokeColor="white"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                            />
                        </div>
                            : "Login"}
                    </button>
                </div>
            </form>
            <p className="text-center font-medium text-gray-500  mt-5">Don't have an account? <Link className="text-gray-600 hover:text-black hover:underline" to="/register">Register</Link></p>
        </div>

        <Toaster />
    </div>
}

export default Login