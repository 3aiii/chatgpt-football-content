import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const verification = () => {
  const token = Cookies.get("token");

  if (token) {
    const decoded = jwtDecode(token);

    if (decoded?.role === "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  return false;
};
