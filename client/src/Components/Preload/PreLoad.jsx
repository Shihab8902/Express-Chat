import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"

const PreLoad = () => {
    return <div className="w-full fixed z-50 h-screen bg-white">
        <div className="flex flex-col h-screen justify-center items-center">
            <Logo />
            <h3 className="text-center font-medium mt-2 text-gray-500">@Developed by <Link className="hover:text-black hover:underline" target="_blank" to="https://webdevshihab.netlify.app/">Shihab Hasan</Link></h3>
        </div>

        <div className="absolute bottom-0 w-full p-5">
            {/* Loading spinner */}
            <div className="flex justify-center items-center flex-col">
                <span className="loading loading-spinner text-success"></span>
                <p className="text-xs font-medium">Gathering resources</p>

                <p className="text-xs font-semibold mt-5">v1.0</p>
            </div>
        </div>
    </div>
}

export default PreLoad