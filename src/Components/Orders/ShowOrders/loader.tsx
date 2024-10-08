import { redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../RefreshToken/refreshToken.ts';

interface LoaderParams {
    params: {
        page: number;
    };
}

type ApiResponse = { type: string; message: string };

export const loader = async ({ params }: LoaderParams): Promise<ApiResponse | Response | null> => {
    const token = Cookies.get('token');
    
    if (!token) {
        return redirect('/login');
    }

    const { page } = params;
    try {
        const response = await api.post(`/Order/orders?page=${page ? page : 1}`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response.data.data.data;
        
    } catch (error: any) {
        console.error('Error fetching data:', error?.response?.status);

        if (error?.response?.status === 403) {
            Cookies.remove('token');
            Cookies.remove('refreshToken');
            return redirect('/login');
        }

        return null;
    }
};
