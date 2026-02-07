import { useState } from "react"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import { serverUrl } from "../App.jsx";
import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

export default function SignIn() {

    const primaryColor = "#ff4d2d"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    function handleData(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    async function handleSignIn() {
        setLoading(true)
        try {
            const response = await axios.post(`${serverUrl}/api/auth/signin`, data, { withCredentials: true })
            setErr("")
            dispatch(setUserData(response.data.data))
            setLoading(false)
            navigate("/")
        } catch (error) {
            setErr(error.response.data.message)
            setLoading(false)
        }
    }

    async function handleGoogleAuth() {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        try {
            const googleEmail = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                email: result.user.email,
            }, { withCredentials: true })
            setErr("")
            dispatch(setUserData(googleEmail.data.data))
            navigate("/")
        } catch (error) {
            setErr(error.response.data.message)
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8`} style={{ border: `${borderColor} 1px solid` }}>
                <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColor }}>Vingo</h1>
                <p className="text-gray-400 mb-6">Sign In to your account to get started with delicious food deliveries</p>

                {/* email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                    <input type="email" placeholder="Enter email" name="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" value={setData.email} onChange={handleData} />
                </div>

                {/* password */}
                <div className="mb-2">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                    <div className="relative">
                        <input type={`${showPassword ? "text" : "password"}`} placeholder="Enter password" name="password" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" onChange={handleData} value={setData.password} />
                        <button className="absolute right-3 cursor-pointer top-3 text-gray-500" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>
                </div>
                <div className="text-sm text-right mb-4 text-[#ff4d2d] cursor-pointer font-medium" onClick={() => navigate("/forgot-password")}>
                    Forgot Password ?
                </div>

                <button className="w-full border-none rounded-lg text-center font-bold px-3 py-2 text-white cursor-pointer mb-4" style={{ backgroundColor: primaryColor }} onClick={handleSignIn}disabled={loading}>{loading ? <ClipLoader color="white" size={15} /> : "Sign In"}</button>
                { err && (<p className="text-red-500 text-center">*{err}</p>)}

                <div className="w-full flex justify-center items-center gap-2 border px-3 py-2 rounded-lg bg-gray-100 border-gray-200 hover:bg-gray-200 cursor-pointer mb-5" onClick={handleGoogleAuth}>
                    <FcGoogle />
                    <span>Sign In with Google</span>
                </div>

                <p className="text-center text-sm cursor-pointer" onClick={() => navigate('/signup')}>Don't have an account ? <span className="text-orange-400 font-medium">Sign Up</span></p>
            </div>
        </div>
    )
}
