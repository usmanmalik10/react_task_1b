import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
      case "LOGIN":
  const { user, token, role } = action.payload;
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  return {
    ...state,
    isAuthenticated: true,
    user,
    token,
    role,
  };

      return {
        ...state,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();
console.log(sdk)
export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      fetch('https://reacttask.mkdlabs.com/v2/api/lambda/login').then((response) => {
          dispatch({
            type: "LOGIN",
            payload: {
              user: response.data,
              token,
              role,
            },
          });
        })
        .catch((error) => {
          tokenExpireError(dispatch, error.response.data.message);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
