import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice.js";
import { ClipLoader } from "react-spinners";

export default function EditItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { itemId } = useParams();

  const [loading, setLoading] = useState(false)
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    foodType: "Veg",
    image: null,
  });
  const categories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];

  const [frontendImage, setFrontendImage] = useState(null);

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
    setLoading(true)
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("foodType", formData.foodType);

      if (formData.image) {
        data.append("image", formData.image);
      }
      const result = await axios.post(`${serverUrl}/api/item/edit-item/${itemId}`, data, {
        withCredentials: true,
      });
      dispatch(setMyShopData(result.data));
      setLoading(false)
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    async function handleGetItemById() {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-id/${itemId}`,
          { withCredentials: true },
        );
        setCurrentItem(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    handleGetItemById();
  }, [itemId]);

  useEffect(() => {
    if (currentItem) {
      setFormData({
        name: currentItem.name,
        price: currentItem.price,
        category: currentItem.category,
        foodType: currentItem.foodType,
        image: null,
      });

      setFrontendImage(currentItem.image);
    }
  }, [currentItem]);

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
          <div className="text-3xl font-extrabold text-gray-900">Edit Food</div>
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
              Food image
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              required
              value={formData.price}
              onChange={handleChange}
              type="number"
              name="price"
              className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
            >
              <option value="null">Select Category</option>
              {categories.map((cate, index) => (
                <option value={cate} key={index}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Type
            </label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-200 rounded-lg outline-none"
            >
              <option value="Veg">Veg</option>
              <option value="Non Veg">Non veg</option>
            </select>
          </div>

          <button
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer"
            type="submit" disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white"/> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
