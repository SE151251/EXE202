// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import { getCookieData } from "../../services/cookie/CookieApp";
// import LoadingScreen from "./LoadingScreen";
// import ValidateError from "./ValidateError";

const PrivateRoute = () => {
//   const userdata = useSelector((state) => state.LoginReducer.userdata);
//   const error = useSelector((state) => state.LoginReducer.errorMessage);
//   const loading = useSelector((state) => state.LoginReducer.loading);
  // const acccessToken = localStorage.getItem("accessToken");
  // const refreshToken = localStorage.getItem("refreshToken");
//   const acccessToken = getCookieData("accessToken");
//   const refreshToken = getCookieData("refreshToken");
  // if (process.env.REACT_APP_BASE_URL?.includes("api/v1/")) {
    const token = localStorage.getItem("token");
//   if (!acccessToken || !refreshToken) {
//     return <Navigate to="/" />;
//   }
//   if (error !== "" && error !== "Request failed with status code 401") {
//     return <ValidateError message={error} />;
//   }
//   if (loading || userdata.id === "") {
//     return <LoadingScreen acccessToken={acccessToken} />;
//   }
if(token){
    <Navigate to="/" />
}
  // }
  return <Outlet />;
};
export default PrivateRoute;