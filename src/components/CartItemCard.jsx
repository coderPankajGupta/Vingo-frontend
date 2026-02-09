import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { removeCartItem, updateQuantity } from "../redux/userSlice.js";

export default function CartItemCard({ data }) {
  const dispatch = useDispatch();
  function handleIncDec(id, currentQty, option) {
    if (option === "Dec") {
      if (currentQty > 1) {
        dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
      }
    } else {
      dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
    }
  }

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border mb-3">
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          className="w-20 h-20 object-cover rounded-lg border"
          alt=""
        />
        <div>
          <h1 className="font-medium text-gray-800">{data.name}</h1>
          <p className="text-sm text-gray-500">
            ₹{data.price} x {data.quantity}
          </p>
          <p className="font-bold text-gray-900">
            ₹{data.price * data.quantity}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => handleIncDec(data.id, data.quantity, "Dec")}
        >
          <FaMinus size={12} />
        </button>
        <span>{data.quantity}</span>
        <button
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => handleIncDec(data.id, data.quantity, "Inc")}
        >
          <FaPlus size={12} />
        </button>
        <button
          className="cursor-pointer p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200"
          onClick={() => dispatch(removeCartItem(data.id))}
        >
          <FaRegTrashCan size={12} />
        </button>
      </div>
    </div>
  );
}
