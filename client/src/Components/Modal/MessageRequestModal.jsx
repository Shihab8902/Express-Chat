import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types';
import { FaCheck } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";



const MessageRequestModal = ({ isModalOpen, setIsModalOpen, data, refetch }) => {

    const axiosSecure = useAxiosSecure();

    // Handle contact add 
    const handleContactAdd = request => {
        Swal.fire({
            title: "Add to contact?",
            text: "Are you sure want to add the message request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                const addedContact = {
                    name: request.name,
                    email: request.email,
                    photo: request.photo,
                    recipientEmail: request.recipientEmail
                }

                axiosSecure.post("/messageRequestToContact", addedContact)
                    .then(res => {
                        if (res.data?.message === "success") {
                            Swal.fire({
                                icon: "success",
                                showConfirmButton: false,
                                text: "Added to contact successfully!",
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

                    <div className="z-50   relative rounded-lg shadow-lg  bg-white">
                        {/* Modal close button */}
                        <span className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-500" onClick={() => setIsModalOpen(!isModalOpen)}>
                            <IoMdClose />
                        </span>

                        {/* Modal body */}
                        <div className="p-5   my-6">

                            <h3 className="text-center font-semibold text-lg text-gray-600 pb-2">Message Requests</h3>
                            <hr />

                            {
                                data?.length > 0 ?
                                    <div>
                                        {
                                            data.map(request => {
                                                return <li
                                                    key={request._id}
                                                    className=" flex mt-5 items-center justify-between gap-5 shadow list-none bg-gray-100 px-5 py-3 rounded-lg">

                                                    <div className=" flex items-center gap-3">
                                                        <img className="w-12 h-12 rounded-full" src={request.photo} alt="user" />
                                                        <div>
                                                            <h3 className=" font-semibold">{request.name}</h3>
                                                            <p className="font-medium text-sm text-gray-500">{request.email}</p>
                                                        </div>
                                                    </div>


                                                    <button onClick={() => handleContactAdd(request)} className="px-5 py-2 bg-green-600 text-white rounded-full"><FaCheck /></button>

                                                </li>
                                            })
                                        }
                                    </div>
                                    :
                                    <div className=" mt-5">
                                        <h3 className="text-sm font-medium text-gray-500">No message request available!</h3>
                                    </div>
                            }
                        </div>

                    </div>
                </div>
            )}


        </>
    );
};

export default MessageRequestModal;



MessageRequestModal.propTypes = {
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
    data: PropTypes.any,
    refetch: PropTypes.func
}