import PropTypes from 'prop-types';
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { useContext, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { UserContext } from '../../Context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ContactAddingModal = ({ isModalOpen, setIsModalOpen }) => {

    const { user } = useContext(UserContext);

    //States
    const [isAdding, setIsAdding] = useState(false);

    const axiosSecure = useAxiosSecure();


    //Handle form submit
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        setIsAdding(true);

        //Check for own email
        if (data.email === user?.email) {
            setIsAdding(false);
            return toast.error("Cannot add a contact using own email address!");
        }

        //Send contact save request
        axiosSecure.post(`/contact?email=${user.email}`, data)
            .then(res => {

                // Handle no user existence
                if (res.data === "No user found!") {
                    setIsAdding(false);
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
                        </div>
                    ));
                }


                //Refetch contact list after adding new one

                setIsAdding(false);

            })
            .catch(error => {
                toast.error(error.message);
                setIsAdding(false);
            });



    }





    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="fixed inset-0 bg-black opacity-50 "></div>

                    <div className="z-50 bg-[#ecf0f3]  relative rounded-lg shadow-lg lg:w-5/12">
                        {/* Modal close button */}
                        <span className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-500" onClick={() => setIsModalOpen(!isModalOpen)}>
                            <IoMdClose />
                        </span>

                        {/* Modal body */}
                        <div className='my-5'>
                            <h3 className='text-center text-2xl font-semibold uppercase mb-2'>Add a contact</h3>
                            <hr />

                            {/* Contact form */}
                            <form className='px-5' onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-5">
                                    <label className="ml-4 font-medium mb-2 block" htmlFor="name">Name</label>
                                    <div className="relative shadow-inputShadow w-full flex items-center rounded-full px-2">
                                        <span className="relative left-3 text-gray-500"><FaRegUser /></span>
                                        <input {...register("name")} className="w-full py-3 px-5 rounded-full bg-transparent outline-none font-bold placeholder:font-normal" type="text" name="name" id="name" placeholder="Contact name" />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="ml-4 font-medium mb-2 block" htmlFor="email">Email*</label>
                                    <div className="relative shadow-inputShadow w-full flex items-center rounded-full px-2">
                                        <span className="relative left-3 text-gray-500"><MdOutlineEmail /></span>
                                        <input {...register("email", { required: true })} className="w-full py-3 px-5 rounded-full bg-transparent outline-none font-bold placeholder:font-normal" type="email" name="email" id="email" placeholder="Enter email" />

                                    </div>
                                    {errors.email?.type === "required" && <p className="text-sm font-semibold text-red-500 ml-4">This field is required!</p>}
                                </div>

                                <div className="mt-5">
                                    <button disabled={isAdding} className="w-full bg-green-700 hover:bg-green-600 text-white  font-bold uppercase shadow-buttonShadow py-3 rounded-full">
                                        {isAdding ? <div className="flex gap-2 items-center justify-center">
                                            <span>Add Contact</span>
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
                                            : "Add Contact"}
                                    </button>
                                </div>

                            </form>

                        </div>




                    </div>
                </div>
            )}

            <Toaster />
        </>
    );
};

export default ContactAddingModal;



//Prop validation
ContactAddingModal.propTypes = {
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
}