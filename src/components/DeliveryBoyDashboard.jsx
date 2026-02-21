import Nav from "./Nav";
import { useSelector } from "react-redux";

export default function DeliveryBoyDashboard() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
      <Nav />
      <div className="w-full max-w-[800px] flex flex-col gap-5 items-center">
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-4">
          <h1 className="text-xl font-bold text-[#ff4d2d]">
            Welcome, {userData.fullName}
          </h1>
          <p className="text-[#ff4d2d]">
            <span className="font-semibold">Latitude: </span>
            {userData.location.coordinates[1]},
            <span className="font-semibold"> Longitude: </span>
            {userData.location.coordinates[0]}
          </p>
          
        </div>
      </div>
    </div>
  );
}
