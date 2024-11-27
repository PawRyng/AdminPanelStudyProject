import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import Cookies from 'js-cookie';
import { redirect } from "react-router";

interface ActionResult {
    email?: string,
    password?: string,
    server?:string

}

export async function action({ request, params }) {
    const formData = await request.formData();

    const email = formData.get('email');
    const password = formData.get('password');

    const emailValidationMessage = emailValidation(email);
    const passwordValidationMessage = passwordValidation(password);

    const result:ActionResult = {};

    if(!emailValidationMessage.correct){
        result.email = emailValidationMessage.message
    }

    if(!passwordValidationMessage.correct){
        result.password = passwordValidationMessage.message
    }

    if(!emailValidationMessage.correct || !passwordValidationMessage.correct) return result;

    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACK_END_HOST}:${process.env.REACT_APP_BACK_END_PORT}/Authentication/login`, {
            login: email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(data.HttpStatus === 0){
            result.server = "Invalid_password_in_login";
            return result
        }
        
        let { exp } = jwtDecode(data.token);

        Cookies.set('token', 
            data.token,
             { 
                path: '/',
                sameSite: 'Lax',
                // httpOnly: true, // zapytać piotera
                secure: process.env.NODE_ENV === 'production',
             });
             Cookies.set('refreshToken', 
                data.refreshToken,
                 { 
                    path: '/',
                    sameSite: 'Lax',
                    // httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                 });

        return redirect('/dashboard'); 
        
    } catch (error) {
        if (error.response && error.response.status === 404) {
            result.email = "Bad_email_in_login";
        } 
        else if(error.response && error.response.status === 401){
            result.password = "Invalid_password"
        }else {
            result.server = "Server_error";
        }
        console.error(error)
        return result
    }



}



interface ValidationResult {
    correct: boolean;
    message?: string; 
}

function emailValidation(email:string): ValidationResult{

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const correct = emailRegex.test(email);

    const result: ValidationResult = {
        correct
    };

    if (!correct) {
        result.message = 'Invalid_email_format';
    }

    return result;
}

function passwordValidation(password: string): ValidationResult {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    const correct = passwordRegex.test(password);

    const result: ValidationResult = {
        correct
    };

    if (!correct) {
        result.message = 'Invalid_password_format';
    }

    return result;
}
