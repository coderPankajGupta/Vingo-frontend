import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setShopsInMyCity } from "../redux/userSlice.js";

export function useGetShopByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);
  useEffect(() => {
    if (!currentCity) return;
    async function fetchShops() {
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-by-city/${currentCity}`,
          {
            withCredentials: true,
          },
        );
        dispatch(setShopsInMyCity(result.data));
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    fetchShops();
  }, [currentCity,dispatch]);
}
