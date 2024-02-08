import { useContext } from "react";
import Login from "../Login/Login";
import { UserContext } from "../../Context/AuthProvider";
import DashBoard from "../Dashboard/Dashboard";

const Home = () => {
    const { user } = useContext(UserContext);


    return <>

        <section >
            {
                user ? <DashBoard /> : <Login />
            }
        </section>






    </>
}

export default Home