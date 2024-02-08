import { useContext } from "react"
import { UserContext } from "../../Context/AuthProvider"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProfilePreview = () => {

    const { user, logOutUser } = useContext(UserContext);


    //Handle user logout
    const handleLogOut = () => {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                logOutUser();
            }
        });
    }


    return <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <img alt={user?.displayName} src={user?.photoURL} />
            </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] px-2 pt-4 shadow-lg bg-base-100 rounded-box w-52">
            <h3 className="text-center font-semibold">{user?.displayName || "User"}</h3>
            <p className="my-2 text-primary font-semibold text-center"><Link to="/profile">Profile</Link></p>
            <button onClick={handleLogOut} className="w-full bg-red-600 py-1 rounded-full text-white font-semibold">Logout</button>
        </ul>
    </div>

}

export default ProfilePreview