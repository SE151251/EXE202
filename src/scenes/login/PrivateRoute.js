import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const acccessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
if (!acccessToken || !refreshToken) {
     return <Navigate to="/" />;
   }
  return <Outlet />;
};
export default PrivateRoute;