import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { redirect } from "react-router";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACK_END_HOST}:${process.env.REACT_APP_BACK_END_PORT}`,
});

const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    const accessToken = Cookies.get('token');
    
    if (!refreshToken) throw new Error("No refresh token found");

    const response: AxiosResponse<{ token: string; refreshToken: string }> = await axios.post(
        `${process.env.REACT_APP_BACK_END_HOST}:${process.env.REACT_APP_BACK_END_PORT}/Authentication/refresh-token`,
        {
          refreshToken,
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

    Cookies.set('token', 
        response.data.token,
         {
            path: '/',
            sameSite: 'Lax',
            // httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
         });
    Cookies.set('refreshToken', 
        response.data.refreshToken,
         { 
            path: '/',
            sameSite: 'Lax',
            // httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
         });

    return response.data.token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    
    Cookies.remove('refreshToken');
    Cookies.remove('token');
    redirect('/login');
    return null;
  }
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      
      if (newAccessToken) {
        originalRequest.headers = {
          ...originalRequest.headers,
          'Authorization': `Bearer ${newAccessToken}`,
        };
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
