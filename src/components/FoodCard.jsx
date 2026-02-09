import { FaLeaf } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice.js";

export default function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);

  function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar className="text-yellow-500 text-lg" />
        ) : (
          <FaRegStar className="text-yellow-500 text-lg" />
        ),
      );
    }
    return stars;
  }

  function handleIncDec(option) {
    if (option === "Dec") {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    } else {
      setQuantity(quantity + 1);
    }
  }

  return (
    <div className="w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative w-full h-[170px] flex justify-center items-center bg-white">
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow z-10">
          {data.foodType === "Veg" ? (
            <FaLeaf color="green" />
          ) : (
            <GiChickenLeg color="red" />
          )}
        </div>

        <img
          src={data.image}
          className="absolute w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          alt=""
        />
      </div>

      <div className="flex-1 flex flex-col p-4">
        <h1 className="font-semibold text-gray-900 text-base truncate">
          {data.name}
        </h1>

        <div className="flex items-center gap-1 mt-1">
          {renderStars(data.rating?.average)}
          <span>{data.rating?.count}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto p-3">
        <span className="font-bold text-gray-900 text-lg">{data.price}</span>
        <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
          <button
            className="px-2 py-1 hover:bg-gray-100 transition"
            onClick={() => handleIncDec("Dec")}
          >
            <FaMinus size={12} />
          </button>
          <span>{quantity}</span>
          <button
            className="px-2 py-1 hover:bg-gray-100 transition"
            onClick={() => handleIncDec("Inc")}
          >
            <FaPlus size={12} />
          </button>
          <button
            className={`${cartItems.some((i) => i.id == data._id) ? "bg-gray-800" : "bg-[#ff4d2d]"} text-white px-3 py-2 transition-colors cursor-pointer`}
            onClick={() =>
              quantity > 0
                ? dispatch(
                    addToCart({
                      id: data._id,
                      name: data.name,
                      price: data.price,
                      image: data.image,
                      shop: data.shop,
                      quantity: quantity,
                      foodType: data.foodType,
                    }),
                  )
                : null
            }
          >
            <FaCartShopping size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
