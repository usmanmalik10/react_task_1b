import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { GlobalContext, showToast } from "../globalContext";
const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(GlobalContext);
  useEffect(()=>{
    if(localStorage.getItem("role")){
      showToast(dispatch, "Login successful");
    }
  },[])
  const logout =()=>{
    localStorage.clear();
    navigate('/')
  }
  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard
        
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/videosection')}>Go to Video List</button>
      <button className="bg-blue-500 ml-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>logout()}>Log out</button>
    </>
  );
};

export default AdminDashboardPage;
