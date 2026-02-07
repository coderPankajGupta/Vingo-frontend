import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice.js";
import { ClipLoader } from "react-spinners";

export default function CreateEditShop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user,
  );
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: myShopData?.name || "",
    city: myShopData?.city || currentCity,
    state: myShopData?.state || currentState,
    address: myShopData?.address || currentAddress,
    image: null,
  });

  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setFrontendImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("address", formData.address);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit`,
        data,
        { withCredentials: true },
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
        onClick={() => navigate("/")}
      >
        <IoArrowBackOutline size={35} className="text-[#ff4d2d]" />
      </div>

      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] h-16 w-16" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {myShopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              required
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"
              className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
              placeholder="Enter shop name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop image
            </label>
            <input
              required={!myShopData}
              onChange={handleChange}
              type="file"
              name="image"
              className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
              accept="image/*"
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                required
                value={formData.city}
                type="text"
                onChange={handleChange}
                name="city"
                className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                required
                value={formData.state}
                onChange={handleChange}
                type="text"
                name="state"
                className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
                placeholder="State"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              required
              type="text"
              value={formData.address}
              onChange={handleChange}
              name="address"
              className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
              placeholder="Enter address here..."
            />
          </div>
          <button
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white"/> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
