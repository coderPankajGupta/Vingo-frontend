import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

export default function ForgotPassword() {

    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [otp, setOtp] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    function handlePassword(e) {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    async function handleSendOtp() {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true })
            setErr("")
            setStep(2)
            console.log(result)
            window.alert(result.data.message)
            setLoading(false)
        } catch (error) {
            setErr(error.response.data.message)
            setLoading(false)
        }
    }

    async function handleVerifyOtp() {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true })
            setErr("")
            setStep(3)
            console.log(result)
            setLoading(false)
        } catch (error) {
            setErr(error.response.data.message)
            setLoading(false)
        }
    }

    async function handleResetPassword() {
        if (password.newPassword != password.confirmPassword) {
            return setErr(`Password and Confirm Password not maches.`)
        }
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/password-reset`, { email, newPassword: password.newPassword }, { withCredentials: true })
            setErr("")
            navigate('/signin')
            console.log(result)
            setLoading(false)
        } catch (error) {
            setErr(error.response.data.message)
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen w-full p-4 bg-[#fff9f6]">
            <div className="w-full max-w-md bg-white border-none shadow-lg border-[#ddd] border rounded-lg p-8">
                <div className="flex items-center gap-4 mb-5">
                    <IoMdArrowRoundBack onClick={() => navigate('/signin')} className="text-[#ff4d2d] text-[17px]" />
                    <h1 className="text-[20px] text-[#ff4d2d] font-medium">Forgot Password</h1>
                </div>

                {/* email  */}
                {step == 1 && <div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Enter email</label>
                        <input type="email" placeholder="Enter email" name="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button className="w-full border-none rounded-lg text-center font-bold px-3 py-2 text-white cursor-pointer bg-[#ff4d2d]" onClick={handleSendOtp} disabled={loading}>{loading ? <ClipLoader color="white" size={15} /> : "Send Otp"}</button>
                    {err && <p className="text-red-500 text-center">*{err}</p>}
                </div>
                }

                {/* Enter otp  */}

                {step == 2 && <div>
                    <div className="mb-4">
                        <label htmlFor="text" className="block text-gray-700 font-medium mb-1">OTP</label>
                        <input type="text" placeholder="Enter OTP" name="otp" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <button className="w-full border-none rounded-lg text-center font-bold px-3 py-2 text-white cursor-pointer bg-[#ff4d2d]" onClick={handleVerifyOtp}disabled={loading}>{loading ? <ClipLoader color="white" size={15} /> : "Verify"}</button>
                    {err && <p className="text-red-500 text-center">*{err}</p>}
                </div>
                }

                {/* password  */}

                {step == 3 && <div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">Enter Passord</label>
                        <input type="password" placeholder="Enter new password" name="newPassword" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" value={password.newPassword} onChange={handlePassword} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm Passord</label>
                        <input type="password" placeholder="Confirm password" name="confirmPassword" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500" value={password.confirmPassword} onChange={handlePassword} />
                    </div>

                    <button className="w-full border-none rounded-lg text-center font-bold px-3 py-2 text-white cursor-pointer bg-[#ff4d2d]" onClick={handleResetPassword}disabled={loading}>{loading ? <ClipLoader color="white" size={15} /> : "Confirm"}</button>
                    {err && <p className="text-red-500 text-center">*{err}</p>}
                </div>
                }

            </div>
        </div>
    )
}
