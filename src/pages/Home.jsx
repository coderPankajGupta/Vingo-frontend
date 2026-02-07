import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard.jsx";
import OwnerDashboard from "../components/OwnerDashboard.jsx";
import DeliveryBoyDashboard from "../components/DeliveryBoyDashboard.jsx";

export default function Home() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-screen min-h-screen pt-25 flex flex-col items-center bg-[#fff9f6]">
      {userData?.role == "user" && <UserDashboard/>}
      {userData?.role == "owner" && <OwnerDashboard/>}
      {userData?.role == "deliveryBoy" && <DeliveryBoyDashboard/>}
    </div>
  );
}
