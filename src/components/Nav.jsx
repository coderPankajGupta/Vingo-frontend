import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { clearUserData } from "../redux/userSlice";
import { FaPlus } from "react-icons/fa6";
import { MdReceiptLong } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { clearOwnerData } from "../redux/ownerSlice";

export default function Nav() {
  const { userData } = useSelector((state) => state.user);
  const { currentCity, cartItems } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/singout`, {
        withCredentials: true,
      });
      dispatch(clearUserData());
      dispatch(clearOwnerData());
      navigate("/signin");
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  return (
    <div className="w-full h-20 flex items-center justify-between md:justify-center gap-7.5 px-5 fixed top-0 z-9999 bg-[#fff9f6] overflow-visible">
      {showSearch && userData.role == "user" && (
        <div className="h-[70px] bg-white shadow-xl rounded-lg flex fixed top-[80px] w-[90%] left-[5%] items-center gap-[20px] md:hidden">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-2.5 border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          <div className="flex items-center gap-[20px] w-[80%]">
            <FaSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="outline-0 w-full px-2.5 text-gray-700"
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
      {userData?.role == "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg hidden md:flex items-center gap-[20px]">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-2.5 border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          <div className="flex items-center gap-[20px] w-[80%]">
            <FaSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="outline-0 w-full px-2.5 text-gray-700"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {userData.role == "user" &&
          (showSearch ? (
            <RxCross2
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            />
          ) : (
            <IoMdSearch
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            />
          ))}

        {userData.role == "owner" ? (
          <>
            {myShopData && (
              <>
                <button
                  className="hidden md:flex gap-1 items-center text-sm font-medium p-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d]"
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus size={20} />
                  <span>Add Food Item</span>
                </button>
                <button
                  className="md:hidden flex items-center text-sm font-medium p-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d]"
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus size={20} />
                </button>
              </>
            )}

            <div
              className="hidden md:flex items-center gap-1 font-medium text-sm bg-[#ff4d2d]/10 text-[#ff4d2d] p-2 rounded-lg relative"
              onClick={() => navigate("/my-orders")}
            >
              <MdReceiptLong size={20} />
              <span>My Orders</span>
              <span className="absolute items-center -top-2 -right-2 text-sm font-bold text-white bg-[#ff4d2d] px-[6px] py-[1px] rounded-full">
                0
              </span>
            </div>
            <div
              className="md:hidden flex items-center gap-1 font-medium text-sm bg-[#ff4d2d]/10 text-[#ff4d2d] p-2 rounded-lg relative"
              onClick={() => navigate("/my-orders")}
            >
              <MdReceiptLong size={20} />
              <span className="absolute -top-2 -right-2 text-sm font-bold text-white bg-[#ff4d2d] px-[6px] py-[1px] rounded-full">
                0
              </span>
            </div>
          </>
        ) : (
          <>
            {userData.role == "user" && (
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <LuShoppingCart size={25} className="text-[#ff4d2d]" />
                <span className="absolute text-[#ff4d2d] -right-2.25 top-[-12px] font-medium">
                  {cartItems.length}
                </span>
              </div>
            )}

            <button
              className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium"
              onClick={() => navigate("/my-orders")}
            >
              My Orders
            </button>
          </>
        )}

        <div
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo(!showInfo)}
        >
          {userData?.fullName?.slice(0, 1)}
        </div>

        {showInfo && (
          <div className={`fixed top-[80px] right-[10px] ${userData.role == "deliveryBoy" ? "md:right-[35%] lg:right-[40%]" : "md:right-[10%] lg:right-[25%]"} w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-9999`}>
            <div className="text-[17px] font-semibold">{userData.fullName}</div>
            {userData.role == "user" && (
              <div
                className="md:hidden cursor-pointer font-semibold text-[#ff4d2d]"
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </div>
            )}

            <div
              className="cursor-pointer font-semibold text-[#ff4d2d]"
              onClick={handleLogOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
