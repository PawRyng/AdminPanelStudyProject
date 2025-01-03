import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useActionData } from "react-router-dom";


import "../../../Style/Views/product_add.scss"

import {ReactComponent as Image} from "../../../assets/Icons/image.svg"

import InputComponent from "../../inputComponent.tsx"
import SelectComponent from '../../selectComponent.tsx';

const AddProduct: React.FC = () => {
    const [ t ] = useTranslation();
    const data = useActionData()
    
  return (
  <div className="product product--add">
    <div className="product__header">
        <h1>{t('Product')} / {t('Add')}</h1>
    </div>
    <div className="product__product-info">
        <Form method="post" action={`/dashboard/product/add`} encType="multipart/form-data">
            <div className="product-row product-row--image">
                 <div className="image-holder">
                    <input type="file" id="image" name="image" accept="image/*" />
                    <label htmlFor="image">
                        <Image />
                    </label>
                </div>
            </div>
           
           <hr />
             {/* Name */}
           <InputComponent
                nameField={t('Name')} 
                dataName='name'
                errorMessage={(data && data.type === 'name') ? data.message : null}
           />

             {/* Description */}
             <InputComponent 
                nameField={t('Description')} 
                dataName='description' 
                type='textarea'
                errorMessage={(data && data.type === 'description') ? data.message : null}
            />
            {/* product Cattegoy */}
            <SelectComponent 
            dataName="productCategoryId" 
            errorMessage={(data && data.type === 'productCategoryId') ? data.message : null}/>
            
            {/* Code */}
            <InputComponent 
                nameField={t('Code')} 
                dataName='code'
                errorMessage={(data && data.type === 'code') ? data.message : null}
            />

            {/* Currency to do napisać cutomowy select najlepiej jako komponent*/}
            <InputComponent 
                nameField={t('Currency')} 
                dataName='currency' 
                errorMessage={(data && data.type === 'currency') ? data.message : null}
            />

            {/* Gross Price */}
            <InputComponent 
                nameField={t('Gross_Price')} 
                dataName='gross_price' 
                type='number'
                errorMessage={(data && data.type === 'gross_price') ? data.message : null}    
            />
            {/* Netto Price */}
            <InputComponent 
                nameField={t('Netto_Price')} 
                dataName='netto_price' 
                type='number'
                errorMessage={(data && data.type === 'netto_price') ? data.message : null}    
            />
            {/* vatType */}
            <InputComponent 
                nameField={t('Vat_type')} 
                dataName='vatType'
                errorMessage={(data && data.type === 'vatType') ? data.message : null} 
            />
            {/* vatValue */}
            <InputComponent 
                nameField={t('Vat_Value')} 
                dataName='vatValue' 
                type='number'
                errorMessage={(data && data.type === 'vatValue') ? data.message : null} 
            />

            <button className='product-row__button'>{t('add_product')}</button>
        </Form>
    </div>
  </div>
  );
};

export default AddProduct;
