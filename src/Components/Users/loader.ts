
import { redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../RefreshToken/refreshToken.ts';

export const loader = async () => {
  if(!Cookies.get('token')) return redirect('/login');

  try {
    const response = await api.get(`/User/users`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error.status);
    if(error.status === 403){
      Cookies.remove('token');
      Cookies.remove('refreshToken');
      return redirect('/login')
    }
    console.error(error)
    return null
  }
}