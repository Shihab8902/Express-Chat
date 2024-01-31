import { useNavigate } from "react-router-dom"

const EmailVerification = () => {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 rounded">
            <div className="max-w-md p-10 bg-white shadow-md rounded-md">
                <h2 className="text-3xl font-semibold mb-6 text-center text-blue-500">
                    Verify Your Email
                </h2>
                <p className="text-gray-700  mb-4">
                    A verification email has been sent to your email address. Please check your inbox and click on the verification link to complete the registration process.
                </p>
                <p className="text-gray-700  mb-4">
                    If you don't see the email in your inbox, please check your spam or junk folder.
                </p>
                <div className="text-center">
                    <button onClick={() => navigate("/login")} className="w-full lg:w-1/2 py-3 bg-green-600 rounded text-white font-semibold">Go to Login </button>
                </div>
            </div>
        </div>
    )
}

export default EmailVerification