import axios from "axios";
import { serverUrl } from "../App";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { FaStore } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

export default function Shop() {
  const { shopId } = useParams();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState([]);

  async function handleShop() {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/get-by-shop/${shopId}`,
        { withCredentials: true },
      );
      setShop(result.data.shop);
      setItems(result.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleShop();
  }, [shopId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {shop && (
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          <img src={shop.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black-30 flex flex-col justify-center items-center text-center px-4">
            <FaStore className="text-white text-4xl mb-3 drop-shadow-md" />
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              {shop.name}
            </h1>
            <div className="flex items-center justify-center gap-[10px] mt-[10px]">
                <FaLocationDot size={20} color="red"/>
              <p className="text-lg font-medium text-gray-200">
                {shop.address}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10">
        
      </div>
    </div>
  );
}
