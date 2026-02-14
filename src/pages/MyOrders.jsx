import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserOrderCart from "../components/UserOrderCart";
import OwnerOrderCart from "../components/OwnerOrderCart";

export default function MyOrders() {
  const { userData, myOrders } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex justify-center px-4">
      <div className="w-full max-w-[800px] p-4">
        <div className="flex items-center gap-[20px] mb-6">
          <div className="z-[10]" onClick={() => navigate("/")}>
            <IoArrowBackOutline size={35} className="text-[#ff4d2d]" />
          </div>
          <h1 className="text-2xl font-bold text-start">My Orders</h1>
        </div>
        <div className="space-y-6">
          {myOrders?.map((order, index) =>
            userData.role == "user" ? (
              <UserOrderCart data={order} key={index} />
            ) : userData.role == "owner" ? (
              <OwnerOrderCart data={order} key={index} />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
