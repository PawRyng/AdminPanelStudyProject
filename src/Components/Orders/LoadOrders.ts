import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../RefreshToken/refreshToken.ts";

export const loader = async ({ params }) => {
  if (!Cookies.get("token")) return redirect("/login");

  // mockup data
  // return mockapData;

  try {
    const response = await api.post(
      `/Order/orders`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data.data.data;
  } catch (error) {
    console.error("Error fetching data:", error.status);
    if (error.status === 403) {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      return redirect("/login");
    }
    return null;
  }
};
