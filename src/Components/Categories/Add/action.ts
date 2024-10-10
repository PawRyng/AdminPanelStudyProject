import api from '../../RefreshToken/refreshToken.ts';
import Cookies from "js-cookie";
import { notEmptyValidation  } from "../../Products/Validation/productValidation.ts";
import { redirect } from 'react-router';


interface ActionParams {
    request: Request;
}

export async function action({request}:ActionParams): Promise<{ type: string; message: string } | null> {
    const token = Cookies.get('token');

    if(!token) return redirect('/login');

    const formData = await request.formData();

    // Zdefiniowanie wszystkich pól formularza
    const name: FormDataEntryValue | null = formData.get('name')


    
    if (!notEmptyValidation(name)) {
        return {
            type: 'name',
            message: 'field_must_not_be_empty'
        };
    }


    try {
        const { data } = await api.post(
            `/ProductCategory/product-category`, 
            {
                name
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if(data.HttpStatus === 0){
            return {
                type: 'name',
                message: data.Message // Product category with name Kategoria testowa already existis
            };
        }
        else if(data.httpStatus === 200){
            return redirect('/dashboard/categories');
        }
        else{
            console.error(data)
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
