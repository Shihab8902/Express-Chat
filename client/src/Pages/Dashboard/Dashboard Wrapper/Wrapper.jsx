import { Link } from "react-router-dom"
import Logo from "../../../Components/Logo/Logo"

const Wrapper = () => {
    return <div className="flex flex-col h-screen justify-center items-center">
        <Logo />
        <h3 className="text-center font-medium mt-2 text-gray-500">@Developed by <Link className="hover:text-black hover:underline" target="_blank" to="https://webdevshihab.netlify.app/">Shihab Hasan</Link></h3>
    </div>
}

export default Wrapper