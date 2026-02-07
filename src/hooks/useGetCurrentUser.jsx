import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

export function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data.data));
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    fetchUser();
  }, [dispatch]);
}
