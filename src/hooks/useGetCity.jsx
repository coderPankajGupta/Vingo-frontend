import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice.js";

export function useGetCity() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (!userData) return; // ⭐ Add this check
    
    // ⭐ Wrap in async function properly
    async function getLocation() {
      try {
        // ⭐ Promisify geolocation
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        const result = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOFY_APIKEY}`,
        );
        dispatch(setCurrentCity(result?.data.results[0].city));
        dispatch(setCurrentState(result?.data.results[0].state));
        dispatch(setCurrentAddress(
          result?.data.results[0].address_line2 || 
          result?.data.results[0].address_line1
        ));
      } catch (error) {
        console.log("Location error:", error);
        // ⭐ Fallback city set karo agar location fail ho
        dispatch(setCurrentCity("Mumbai")); // Default city
      }
    }
    
    getLocation();
  }, [userData, dispatch]);
}