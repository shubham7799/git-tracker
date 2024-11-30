import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { setAccessToken } from "../store/authSlice";
import Cookies from "js-cookie";

function LoginSuccess() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      fetch(process.env.REACT_APP_BASE_URL + "/getAccessToken?code=" + code, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            const token = data.access_token;
            dispatch(setAccessToken(token));
            Cookies.set("access-token", token, { expires: 7 });
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  }, [code]);

  return (
    <div className="h-screen flex justify-center items-center">
      <p className="font-semibold text-lg">Authenticating...</p>
    </div>
  );
}

export default LoginSuccess;
