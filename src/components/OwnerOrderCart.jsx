import { MdPhone } from "react-icons/md";

export default function OwnerOrderCart({ data }) {
  console.log(data)
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {data.user.fullName}
        </h2>
        <p className="text-sm text-gray-500">{data.user.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <MdPhone />
          <span>{data.user.mobile}</span>
        </p>
      </div>

      <div className="flex items-start flex-col gap-2 text-gray-600 text-sm">
        <p>{data.deliveryAddress.text}</p>
        <p className="text-xs text-gray-500">
          Lat: {data.deliveryAddress.latitude} , Lon:{" "}
          {data.deliveryAddress.longitude}
        </p>
      </div>


    </div>
  );
}
