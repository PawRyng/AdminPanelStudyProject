import api from "../RefreshToken/refreshToken.ts";
import Cookies from "js-cookie";
import { redirect } from "react-router";
export async function action({ request, params }) {
    const token:string | undefined = Cookies.get('token');
    if(!token) return redirect('/login')


    const formData = await request.formData();
    
    const id = formData.get('id')

    try{
        const query = await api.patch(`/Product/product?id=${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return redirect('/dashboard/products')
    }
    catch(error){
        console.error('error in delete product')
        console.error(error)
        return redirect('/dashboard')
    }
}