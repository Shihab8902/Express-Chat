import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types';
import { CiEdit, CiTrash } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { RotatingLines } from "react-loader-spinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ContactManageModal = ({ isModalOpen, setIsModalOpen, contact, refetch }) => {

    const { name, email, _id } = contact;

    const [isEdit, setIsEdit] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm();


    const axiosSecure = useAxiosSecure();

    //Handle contact edit
    const onSubmit = (data) => {
        setIsEditing(true);
        axiosSecure.put(`/contact?id=${_id}`, data)
            .then(res => {
                if (res.data === "No user found!") {
                    setIsEditing(false);
                    return toast.error((t) => (
                        <div>
                            <p className='text-xs font-medium'>We couldn't find a user associated with this email address. Send an invitation to join our Express Chat platform and contribute to its growth.</p>

                            <div className='mt-5 flex justify-between'>
                                <button onClick={() => {
                                    toast.dismiss(t.id);
                                    toast("This functionality is currently under development.", { icon: "🧑‍💻" });

                                }} className='bg-green-500 text-white font-semibold text-xs py-2 rounded-md px-5'>Send invitation</button>
                                <button onClick={() => toast.dismiss(t.id)} className='bg-gray-400 text-white font-semibold text-xs py-2 rounded-md px-5'>Dismiss</button>
                            </div>
                        </div>))
                }

                refetch();
                setIsModalOpen(!isModalOpen);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Contact successfully updated!",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch(error => {
                toast.error(error.message);
                setIsEditing(false);
            })
    }

    //Handle contact delete
    const handleContactDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/contact?id=${_id}`)
                    .then(res => {
                        if (res.data) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your contact has been deleted.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                            setIsModalOpen(!isModalOpen);
                        }
                    })



            }
        });
    }




    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  ">
                    <div className="fixed inset-0 bg-black opacity-50 "></div>

                    <div className="z-50   relative rounded-lg shadow-lg  bg-[#ecf0f3]">
                        {/* Modal close button */}
                        <span className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-500" onClick={() => setIsModalOpen(!isModalOpen)}>
                            <IoMdClose />
                        </span>

                        {/* Modal body */}

                        {/* Action buttons */}
                        <ul className={`px-10 pb-6 mt-12 ${isEdit ? "hidden" : "block"}`}>
                            <li className="mt-5">
                                <button onClick={() => setIsEdit(!isEdit)} className="flex items-center gap-2 shadow-buttonShadow w-full px-5 py-2 rounded-full font-semibold "><CiEdit className="text-2xl text-green-600" /> Edit Contact</button>
                            </li>

                            <li className="mt-5">
                                <button onClick={handleContactDelete} className="flex items-center gap-2 shadow-buttonShadow px-5 w-full py-2 rounded-full font-semibold"><CiTrash className="text-xl text-red-600" /> Delete Contact</button>
                            </li>
                        </ul>


                        {/* Contact edit form */}
                        <form className={`${isEdit ? "block" : "hidden"} px-10 py-5`} onSubmit={handleSubmit(onSubmit)}>
                            <div className="mt-5">
                                <label className="ml-4 font-medium mb-2 block" htmlFor="name">Name*</label>
                                <div className="relative shadow-inputShadow w-full flex items-center rounded-full px-2">
                                    <span className="relative left-3 text-gray-500"><FaRegUser /></span>
                                    <input {...register("name", { required: true })} defaultValue={name} className="w-full py-3 px-5 rounded-full bg-transparent outline-none font-bold placeholder:font-normal" type="text" name="name" id="name" placeholder="Enter your name" />
                                </div>
                                {errors.name?.type === "required" && <p className="text-sm font-semibold text-red-500 ml-4">This field is required!</p>}
                            </div>

                            <div className="mt-5">
                                <label className="ml-4 font-medium mb-2 block" htmlFor="email">Email*</label>
                                <div className="relative shadow-inputShadow w-full flex items-center rounded-full px-2">
                                    <span className="relative left-3 text-gray-500 text-xl"><MdOutlineEmail /></span>
                                    <input {...register("email", { required: true })} defaultValue={email} className="w-full py-3 px-5 rounded-full bg-transparent outline-none font-bold placeholder:font-normal" type="email" name="email" id="email" placeholder="Enter your email" />
                                </div>
                                {errors.email?.type === "required" && <p className="text-sm font-semibold text-red-500 ml-4">This field is required!</p>}
                            </div>

                            <div className="mt-5">
                                <button disabled={isEditing} className="w-full bg-green-700 hover:bg-green-600 text-white  font-bold uppercase shadow-buttonShadow py-3 rounded-full">
                                    {isEditing ? <div className="flex gap-2 items-center justify-center">
                                        <span>Updating...</span>
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
                                        : "Update Contact"}
                                </button>
                            </div>



                        </form>




                    </div>
                </div>
            )}

            <Toaster />
        </>
    );
};

export default ContactManageModal;



ContactManageModal.propTypes = {
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
    contact: PropTypes.object,
    refetch: PropTypes.func,
}