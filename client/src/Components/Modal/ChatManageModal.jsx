import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types';
import { CiTrash } from "react-icons/ci";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ConversationContext } from "../../Context/ConversationProvider";


const ChatManageModal = ({ isModalOpen, setIsModalOpen, chatData, refetch }) => {

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { id, sender, receiver } = chatData;

    const { setConversations } = useContext(ConversationContext);


    //Conversation delete
    const handleConversationDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/chat?id=${id}&sender=${sender}&receiver=${receiver}`)
                        .then(res => {
                            if (res.data) {
                                Swal.fire({
                                    text: "Conversation deleted successfully!",
                                    position: "center",
                                    showConfirmButton: false,
                                    icon: "success",
                                    timer: 1500
                                });
                                navigate("/");
                                refetch();
                                setConversations([]);
                                setIsModalOpen(!isModalOpen);

                            }
                        });
                }
            })
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
                        <ul className={`px-10 pb-6 mt-12`}>
                            <li className="mt-5">
                                <button onClick={handleConversationDelete} className="flex items-center gap-2 shadow-buttonShadow px-5 w-full py-2 rounded-full font-semibold"><CiTrash className="text-xl text-red-600" /> Delete Conversation</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}


        </>
    );
};

export default ChatManageModal;



ChatManageModal.propTypes = {
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
    chatData: PropTypes.object,
    refetch: PropTypes.func
}