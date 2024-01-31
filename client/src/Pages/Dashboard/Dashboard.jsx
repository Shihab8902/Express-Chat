import { useContext } from "react"
import { UserContext } from "../../Context/AuthProvider"

const DashBoard = () => {

    const { logOutUser } = useContext(UserContext);

    return <button onClick={() => logOutUser()} className="btn-primary">Logout</button>



    //TODO: 1. complete loading spinner implementation in login and register
    //2. Implement JWT
    //3. Save user to database
    //4. Add forget password link to login page


}

export default DashBoard