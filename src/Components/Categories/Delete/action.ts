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
    const id:FormDataEntryValue = formData.get('id');   

    try {
        const { data } = await api.delete(
            `/ProductCategory/product-category?id=${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            }
        );
        console.log(data);
        return redirect('/dashboard/categories');
    } catch (error) {
        console.error(error);
        return null;
    }
}
