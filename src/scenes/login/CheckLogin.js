import { Navigate, Outlet } from "react-router-dom";
const CheckLogin = () => {
  const acccessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const isLogin = localStorage.getItem("isLogin");
if (acccessToken && refreshToken && isLogin) {
     return <Navigate to="/dashboard" />;
   }
  return <Outlet />;
};
export default CheckLogin;