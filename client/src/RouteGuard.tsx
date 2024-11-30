import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAccessToken } from "./store/authSlice";

function RouteGuard({ children }: any) {
  const dispatch = useDispatch();
  const tokenCookie = Cookies.get("access-token");
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    } else if (tokenCookie) {
      dispatch(setAccessToken(tokenCookie));
    } else if (location.pathname !== "/") {
      navigate("/");
    }
  }, [accessToken, location]);

  return <div>{children}</div>;
}

export default RouteGuard;
