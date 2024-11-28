import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../RefreshToken/refreshToken.ts";

interface Price {
  netPrice: number;
  grossPrice: number;
  vatValue: number;
}

interface Order {
  apartmentNo: string;
  basketId: string;
  buildingNo: string;
  city: string;
  customerId: string;
  email: string;
  id: string;
  lastName: string;
  name: string;
  number: string;
  phoneNumber: string;
  postalCode: string;
  price: Price;
  productDtos: any[]; // Jeśli znasz strukturę produktu, zastąp 'any' odpowiednim typem
  street: string;
  tin: string;
  companyName: string;
}

interface LoaderParams {
  params: {
    id: string;
  };
}

export const loader = async ({
  params,
}: LoaderParams): Promise<Order | Response> => {
  const { id } = params;

  // Sprawdzenie czy istnieje token
  if (!Cookies.get("token")) {
    return redirect("/login");
  }

  try {
    // Pobieranie danych zamówienia
    const response = await api.get(`/Order/orders/${id}`);

    // Zwrócenie danych zamówienia (zakładam, że jest zgodne z typem Order)
    return response.data.data as Order;
  } catch (error: any) {
    // Typujemy error jako 'any', ponieważ zależy od implementacji api.get
    console.error("Error fetching data:", error);

    // Obsługa błędów, np. gdy status to 403
    if (error.response && error.response.status === 403) {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      return redirect("/login");
    }

    throw new Response("Failed to load order", { status: 500 });
  }
};
