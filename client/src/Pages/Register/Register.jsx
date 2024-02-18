import { useForm } from "react-hook-form";
import { FaRegEye, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo/Logo";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/AuthProvider";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";
import { RotatingLines } from 'react-loader-spinner';
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Register = () => {

    const navigate = useNavigate();
    const userPlaceholder = "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp";

    //States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const { createUser } = useContext(UserContext);
    const axiosPublic = useAxiosPublic();


    //Form submit
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        setIsRegistering(true);

        createUser(data?.email, data?.password)
            .then(response => {
                const user = response?.user;
                if (user) {
                    sendEmailVerification(user)
                        .then(() => {
                            updateProfile(user, { displayName: data?.name || "Unknown", photoURL: userPlaceholder })
                                .then(() => {
                                    setIsRegistering(false);
                                    //Save verified user to Database
                                    axiosPublic.post("/user", { name: user?.displayName, email: user?.email })
                                        .then(res => {
                                            if (res.data) {
                                                Swal.fire({
                                                    title: " Verify Your Email!",
                                                    text: " A verification email has been sent to your email address. Please check your inbox and click on the verification link to complete the registration process.",
                                                    confirmButtonText: "Go to Login"
                                                }).then(result => {
                                                    if (result.isConfirmed) {
                                                        navigate("/login", { replace: true });
                                                    }
                                                });
                                            }
                                        })

                                });
                        });
                }
            })
            .catch(error => {
                toast.error(error?.message);
                setIsRegistering(false);
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
                    <label className="ml-4 font-medium mb-2 block" htmlFor="name">Name*</label>
                    <div className="relative shadow-inputShadow w-full flex items-center rounded-full px-2">
                        <span className="relative left-3 text-gray-500"><FaRegUser /></span>
                        <input {...register("name", { required: true })} className="w-full py-3 px-5 rounded-full bg-transparent outline-none font-bold placeholder:font-normal" type="text" name="name" id="name" placeholder="Enter your name" />
                    </div>
                    {errors.name?.type === "required" && <p className="text-sm font-semibold text-red-500 ml-4">This field is required!</p>}
                </div>

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



                <div className="mt-5">
                    <button disabled={isRegistering} className="w-full bg-green-700 hover:bg-green-600 text-white  font-bold uppercase shadow-buttonShadow py-3 rounded-full">
                        {isRegistering ? <div className="flex gap-2 items-center justify-center">
                            <span>Register</span>
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
                            : "Register"}
                    </button>
                </div>
            </form>
            <p className="text-center font-medium text-gray-500  mt-5">Already have an account? <Link className="text-gray-600 hover:text-black hover:underline" to="/login">Login</Link></p>
        </div>

        <Toaster />
    </div>
}

export default Register