import api from '../../RefreshToken/refreshToken.ts';
import Cookies from "js-cookie";
import { redirect } from 'react-router';
import { notEmptyValidation } from "../../Products/Validation/productValidation.ts";

interface ActionParams {
    request: Request;
    params: {
        id: string;
    };
}

export async function action({ request, params }: ActionParams): Promise<{ type: string; message: string } | null> {
    const formData = await request.formData();
    const name:FormDataEntryValue = formData.get('name');   

    // Walidacja danych z formularza
    if (!notEmptyValidation(name)) {
        return {
            type: 'name',
            message: 'field_must_not_be_empty'
        };
    }

    try {
        const { data } = await api.put(
            `ProductCategory/product-category`, 
            {
                id: params.id,
                name: name,
            },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
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

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
