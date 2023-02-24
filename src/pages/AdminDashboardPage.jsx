import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../authContext";

import { GlobalContext, showToast } from "../globalContext";
const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(GlobalContext);
  const logoutApi = React.useContext(AuthContext);
  useEffect(()=>{
    if(localStorage.getItem("role")){
      showToast(dispatch, "Login successful");
    }
  },[])
  const logout =()=>{
   logoutApi.dispatch({
    type: "LOGOUT",
    payload: {
    isAuthenticated: false,
    user: null
    },
    });
    navigate('/')
  }
  return (
    <>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/videosection')}>Go to Video List</button>
      <button className="bg-blue-500 ml-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Log out</button>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard
        
      </div>
      
    </>
  );
};

export default AdminDashboardPage;
