
import { redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../RefreshToken/refreshToken.ts';

export const loader = async ({ params }) => {
  if(!Cookies.get('token')) return redirect('/login');
    const { id } = params;

  try {
    // const response = await api.get(`/ProductCategory/product-categories/${id}`,
    // {
    //   headers: {
    //     "Authorization": `Bearer ${token}`
    //   }
    // },
    // {});
    // console.log(response)
    // return response.data.data;
    return {
      id,
      name: "test"
    }
  } catch (error) {
    console.error('Error fetching data:', error.status);
    return redirect('/dashboard/categories')
  }
}