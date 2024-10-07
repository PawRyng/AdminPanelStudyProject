import api from '../../RefreshToken/refreshToken.ts';
import Cookies from "js-cookie";
import { vatTypeValidation, priceValidation, currencyValidate, notEmptyValidation, convertImageToBase64 } from "../Validation/productValidation.ts";

interface ActionParams {
    request: Request;
    params: {
        id: string;
    };
}

interface FormDataFields {
    image: File | null;
    productCategoryId: FormDataEntryValue | null;
    name: FormDataEntryValue | null;
    description: FormDataEntryValue | null;
    code: FormDataEntryValue | null;
    currency: FormDataEntryValue | null;
    grossPrice: FormDataEntryValue | null;
    nettoPrice: FormDataEntryValue | null;
    vatType: FormDataEntryValue | null;
    vatValue: FormDataEntryValue | null;
}

export async function action({ request, params }: ActionParams): Promise<{ type: string; message: string } | null> {
    const formData = await request.formData();

    // Zdefiniowanie wszystkich pól formularza
    const fields: FormDataFields = {
        image: formData.get('image') as File | null,
        productCategoryId: formData.get('productCategoryId'),
        name: formData.get('name'),
        description: formData.get('description'),
        code: formData.get('code'),
        currency: formData.get('currency'),
        grossPrice: formData.get('gross_price'),
        nettoPrice: formData.get('netto_price'),
        vatType: formData.get('vatType'),
        vatValue: formData.get('vatValue')
    };

    // Konwersja obrazu do Base64, jeśli jest przesłany
    let base64Image: string | undefined;
    if (fields.image && fields.image instanceof Blob) {
        base64Image = await convertImageToBase64(fields.image);
    }
    console.log(base64Image)

    // Walidacja danych z formularza
    if (!notEmptyValidation(fields.name)) {
        return {
            type: 'name',
            message: 'field_must_not_be_empty'
        };
    }

    if(!notEmptyValidation(fields.productCategoryId)) return {
        type: 'productCategoryId',
        message: 'field_not_be_empty'
    }

    if (!notEmptyValidation(fields.code)) {
        return {
            type: 'code',
            message: 'field_must_not_be_empty'
        };
    }

    if (!currencyValidate(fields.currency)) {
        return {
            type: 'currency',
            message: 'choose_accepted_currency'
        };
    }

    if (!priceValidation(fields.grossPrice)) {
        return {
            type: 'gross_price',
            message: 'gross_price_must_be_greater_than_0'
        };
    }

    if (!priceValidation(fields.nettoPrice)) {
        return {
            type: 'netto_price',
            message: 'netto_price_must_be_greater_than_0'
        };
    }

    if (!vatTypeValidation(fields.vatType)) {
        return {
            type: 'vatType',
            message: 'VatType_must_have_only_2_chars'
        };
    }

    if (!priceValidation(fields.vatValue)) {
        return {
            type: 'vatValue',
            message: 'vatValue_must_be_greater_than_0'
        };
    }

    try {
        const { data } = await api.put(
            `${process.env.REACT_APP_BACK_END_HOST}:${process.env.REACT_APP_BACK_END_PORT}/Product/product`, 
            {
                id: params.id,
                name: fields.name,
                description: fields.description,
                productCategoryId: fields.productCategoryId,
                code: fields.code,
                netPrice: fields.nettoPrice,
                grossPrice: fields.grossPrice,
                vatValue: fields.vatValue,
                vatType: fields.vatType,
                currency: fields.currency,
                // productPhotoBlob: base64Image 
            },
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            }
        );

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
