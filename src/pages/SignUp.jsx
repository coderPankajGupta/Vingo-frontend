import { useState } from "react"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import { serverUrl } from "../App.jsx";
import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import { ClipLoader } from 'react-spinners'
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

export default function SignUp() {

    const primaryColor = "#ff4d2d"
    const bgColor = "#fff9f6"
    const borderColor = "#ddd"

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        role: "user"
    })
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    function handleData(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    async function handleSignUp() {
        setLoading(true)
        try {
            const response = await axios.post(`${serverUrl}/api/auth/signup`, data, { withCredentials: true })
            setErr("")
            navigate('/signin')
            dispatch(setUserData(response.data))
            setLoading(false)
        } catch (error) {
            setErr(error.response.data.message)
            setLoading(false)
        }
    }

    async function handleGoogleAuth() {
        if (!data.mobile) {
            return setErr("Mobile number is required.")
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        try {
            const user = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                mobile: data.mobile,
                role: data.role
            }, { withCredentials: true })
            dispatch(setUserData(user.data))
            setErr("")
        } catch (error) {
            setErr(error.response.data.message)
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8`} style={{ border: `${borderColor} 1px solid` }}>
                <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColor }}>Vingo</h1>
                <p className="text-gray-400 mb-8">Create your account to get started with delicious food deliveries</p>

                {/* fullName */}
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input required type="text" placeholder="Enter full name" name="fullName" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" value={setData.fullName} onChange={handleData} />
                </div>

                {/* email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                    <input required type="email" placeholder="Enter email" name="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" value={setData.email} onChange={handleData} />
                </div>

                {/* mobile */}
                <div className="mb-4">
                    <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1">Phone</label>
                    <input required type="text" placeholder="Enter phone number" name="mobile" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" value={setData.mobile} onChange={handleData} />
                </div>

                {/* password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                    <div className="relative">
                        <input required type={`${showPassword ? "text" : "password"}`} placeholder="Enter password" name="password" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" onChange={handleData} value={setData.password} />
                        <button className="absolute right-3 cursor-pointer top-3 text-gray-500" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                    </div>
                </div>

                {/* role */}
                <div className="mb-5">
                    <label htmlFor="role" className="block text-gray-700 font-medium mb-1">Role</label>
                    <div className="flex gap-2">
                        {["user", "owner", "deliveryBoy"].map((r) => (
                            <button key={r} onClick={() => setData({ ...data, role: r })} className="flex-1 border rounded-lg  px-3 py-2 text-center font-medium transition-colors" style={data.role == r ? { backgroundColor: primaryColor, color: "white" } : { border: `1px solid ${primaryColor}`, color: primaryColor }}>
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                <button className={`w-full border-none rounded-lg text-center font-bold px-3 py-2 text-white cursor-pointer mb-4`} style={{ backgroundColor: primaryColor }} onClick={handleSignUp} disabled={loading}>{loading ? <ClipLoader color="white" size={15} /> : "Sign Up"}</button>
                {err && (<p className="text-red-500 text-center">*{err}</p>)}

                <div className="w-full flex justify-center items-center gap-2 border px-3 py-2 rounded-lg bg-gray-100 border-gray-200 hover:bg-gray-200 cursor-pointer mb-5" onClick={handleGoogleAuth}>
                    <FcGoogle />
                    <span>Sign up with Google</span>
                </div>

                <p className="text-center text-sm cursor-pointer" onClick={() => navigate('/signin')}>Already have an account ? <span className="text-orange-400 font-medium">Sign In</span></p>
            </div>
        </div>
    )
}
