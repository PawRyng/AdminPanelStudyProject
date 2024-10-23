import { redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../RefreshToken/refreshToken.ts';

export const loader = async ({ params }) => {
    const token = Cookies.get('token');

    if(!token) return redirect('/login');


    const { page } = params;

    try {
      const response = await api.post(`/ProductCategory/product-categories`, 
        {
          page: page ? page : 1
        }
      );
      return response.data.data.data;
    } catch (error) {
      console.error('Error fetching data:', error.status);
      if(error.status === 403){
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        return redirect('/login')
      }
      return null
    }
}