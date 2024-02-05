import { useContext } from "react"
import { UserContext } from "../../Context/AuthProvider"

const DashBoard = () => {

    const { logOutUser } = useContext(UserContext);

    return <button onClick={() => logOutUser()} className="btn-primary">Logout</button>



    //TODO: 
    //4. Add forget password link to login page


}

export default DashBoard