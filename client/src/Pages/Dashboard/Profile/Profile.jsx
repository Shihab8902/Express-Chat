import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../Context/AuthProvider";
import { GoDotFill } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const imageHostingAPIKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;

    const [photo, setPhoto] = useState(user?.photoURL);
    const [name, setName] = useState(user?.displayName);
    const [modifiedPhoto, setModifiedPhoto] = useState('');
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [isImageUpdating, setIsImageUpdating] = useState(false);


    //Render selected image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setModifiedPhoto(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhoto(reader.result);
                setIsImageChanged(true);
            };
            reader.readAsDataURL(file);
        }
    };


    //Update user image
    useEffect(() => {
        if (isImageChanged) {
            setIsImageUpdating(true);
            // Upload the image to imageBB
            axiosPublic.post(`https://api.imgbb.com/1/upload?key=${imageHostingAPIKey}`, { image: modifiedPhoto }, {
                headers: {
                    "content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    if (res.data?.success) {
                        const imageURL = res.data?.data.display_url;
                        // Post the updated image url to database
                        axiosSecure.put(`/user?email=${user?.email}`, { photo: imageURL })
                            .then(res => {
                                if (res.data === "success") {
                                    // Update user profile in firebase
                                    updateProfile(user, {
                                        photoURL: imageURL
                                    })
                                        .then(() => {
                                            setPhoto(user?.photoURL);
                                            setIsImageUpdating(false);
                                            setIsImageChanged(false);
                                            Swal.fire({
                                                icon: "success",
                                                text: "The profile image has been successfully updated!",
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        })
                                }
                            })
                    }
                })
        }
    });



    //Update user name
    const handleNameUpdate = () => {
        Swal.fire({
            input: "text",
            title: "Update name",
            inputValue: user?.displayName,
            inputAttributes: {
                autocapitalize: "off"
            },
            confirmButtonText: "Update",
            confirmButtonColor: "green"
        })
            .then(result => {
                if (result.isConfirmed) {
                    const updatedName = result.value;
                    setName(updatedName);

                    if (!updatedName) {
                        return toast.error("The name field must not be left empty!");
                    }

                    //Update the database
                    axiosSecure.put(`/user?email=${user?.email}`, { name: updatedName })
                        .then(res => {
                            if (res.data === "success") {
                                //Update firebase
                                updateProfile(user, { displayName: updatedName })
                                    .then(() => {
                                        setName(user?.displayName);
                                        Swal.fire({
                                            icon: "success",
                                            text: "The name has been successfully updated!",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    })
                            }
                        })

                }
            })
    };





    return <div className=" bg-[#ecf0f3] w-full h-screen flex justify-center items-center">

        <div className="bg-white h-fit w-fit p-16 rounded-lg relative ">

            {/* image container */}
            <div className="relative w-fit mx-auto">
                {
                    isImageUpdating ? <img className="w-20 h-20 rounded-full mx-auto" src="https://i.ibb.co/tm2yWnf/updating.gif" alt="user" />
                        :
                        <img className="w-20 h-20 rounded-full mx-auto" src={photo || user?.photoURL} alt="user" />
                }
                <button className="absolute bottom-0 right-0 bg-green-600 text-white p-4 rounded-full text-lg w-6 h-6 flex items-center justify-center cursor-pointer">
                    + <input onChange={handleImageChange} type="file" accept="image/*" className="absolute opacity-0 bottom-0 right-0 cursor-pointer " />
                </button>
            </div>

            {/* Active status */}
            <div className="mt-5">
                <h2 className="flex items-center justify-center font-medium "><GoDotFill className="text-green-600" /> Active</h2>
            </div>

            {/* Name  */}
            <div className="my-4 flex items-center  gap-2">
                <h3 className="text-2xl font-semibold">{name}</h3>
                <button onClick={handleNameUpdate} className="text-xl cursor-pointer"> <CiEdit /></button>
            </div>

            {/* Email */}
            <div>
                <h4 className="font-medium text-gray-600 text-center">{user?.email}</h4>
            </div>


            {/* Back button */}
            <div className="absolute top-3 left-3 p-3">
                <button onClick={() => navigate("/")} className="text-xl text-gray-600"><FaArrowLeft /></button>
            </div>


        </div>

        <Toaster />

    </div>
}

export default Profile