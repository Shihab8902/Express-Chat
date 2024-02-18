import { useContext } from "react";
import { Outlet } from "react-router-dom"
import PreLoad from "../Components/Preload/PreLoad";
import { UserContext } from "../Context/AuthProvider";


const Root = () => {

    const { preLoaderLoading } = useContext(UserContext);

    return <>

        {preLoaderLoading && <PreLoad />}

        <Outlet />


    </>
}

export default Root