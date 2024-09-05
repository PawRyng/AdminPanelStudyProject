
import { redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export const loader = () => {
  if(!Cookies.get('token')) return redirect('/login');
  return 'return data from backend to do';
  }