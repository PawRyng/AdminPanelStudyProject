import api from '../../RefreshToken/refreshToken.ts';
import Cookies from "js-cookie";
import { vatTypeValidation, priceValidation, currencyValidate, notEmptyValidation } from "../Validation/productValidation.ts";
import { redirect } from 'react-router';
import { error } from 'console';

export async function action({ request, params }) {
    const formData = await request.formData();

    const productCategoryId = formData.get('productCategoryId');
    const name = formData.get('name');
    const description = formData.get('description');
    const code = formData.get('code');
    const currency = formData.get('currency');
    const grossPrice = formData.get('gross_price');
    const nettoPrice = formData.get('netto_price');
    const vatType = formData.get('vatType');
    const vatValue = formData.get('vatValue');

    if(!notEmptyValidation(name)) return {
        type: 'name',
        message: 'field_must_not_be_empty'
    }
    if(!notEmptyValidation(productCategoryId)) return {
        type: 'productCategoryId',
        message: 'field_not_be_empty'
    }
    if(!notEmptyValidation(code)) return {
        type: 'code',
        message: 'field_must_not_be_empty'
    }
    if(!currencyValidate(currency)) return {
        type: 'currency',
        message: 'choose_accepted_curency'
    }
    if(!priceValidation(grossPrice)) return {
        type: 'gross_price',
        message: 'gross_price_must_be_greater_than_0'
    }
    if(!priceValidation(nettoPrice)) return {
        type: 'netto_price',
        message: 'netto_price_must_be_greater_than_0'
    }
    if(!vatTypeValidation(vatType)) return {
        type: 'vatType',
        message: 'VatType_must_have_only_2_chars'
    }
    if(!priceValidation(vatValue)) return {
        type: 'vatValue',
        message: 'vatValue_must_be_greater_than_0'
    }

    try {
        const {data} = await api.post(`${process.env.REACT_APP_BACK_END_HOST}:${process.env.REACT_APP_BACK_END_PORT}/Product/product`, 
            {
                name,
                description,
                productCategoryId,
                code,
                netPrice: nettoPrice,
                grossPrice,
                vatValue,
                vatType,
                currency
            },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                  },
            });
            if(data.httpStatus === 200){
                return redirect('/dashboard/products')
            }
            else if(data.HttpStatus === 0){
                return {
                    type: 'code',
                    message: data.Message
                }
            }
            else{
                console.error("Product not added", data)
            }
    } catch (error) {
        console.error(error)
        return null
    }
}


