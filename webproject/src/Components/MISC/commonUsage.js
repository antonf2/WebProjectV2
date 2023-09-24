import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

export const projectId = "8c2c3244-cb44-475b-8f34-98d2b2ba4cd5";
export const token = localStorage.getItem("USER_TOKEN");
export const url =
  "https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev";
export const Decode = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, []);
  return decodedToken;
};
export const userToken = Decode;
