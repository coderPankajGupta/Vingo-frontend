import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { useGetCurrentUser } from "./hooks/useGetCurrentUser.jsx";
import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import { useGetCity } from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import { useGetShopByCity } from "./hooks/useGetShopByCity.jsx";
import { useGetItemsByCity } from "./hooks/useGetItemsByCity.jsx";
import { useEffect, useState } from "react";

export const serverUrl = "http://localhost:5000";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemsByCity();

  const { userData, currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData && !currentCity) {
      setIsReady(false);
    } else {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [userData, currentCity]);

  if (!isReady) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fff9f6]">
        <h1 className="text-6xl font-bold text-[#ff4d2d] mb-8 animate-pulse">
          Vingo
        </h1>
        <div className="flex gap-3">
          <div className="w-4 h-4 bg-[#ff4d2d] rounded-full animate-bounce"></div>
          <div
            className="w-4 h-4 bg-[#ff4d2d] rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 bg-[#ff4d2d] rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        <p className="text-gray-600 mt-6">
          {userData && !currentCity
            ? "Detecting your location..."
            : "Loading..."}
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/create-edit-shop"
        element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/add-item"
        element={userData ? <AddItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/edit-item/:itemId"
        element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}
