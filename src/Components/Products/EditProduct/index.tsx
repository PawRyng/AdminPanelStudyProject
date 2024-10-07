import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, Form, useActionData } from "react-router-dom";


import "../../../Style/Views/product_edit.scss"

import EditProductInputRow from '../../inputComponent.tsx';
import SelectComponent from '../../selectComponent.tsx';

import {ReactComponent as Image} from "../../../assets/Icons/image.svg"


const EditProduct: React.FC = () => {
    const [ t ] = useTranslation();
    const product = useLoaderData();   
    const data = useActionData()
    

  return (
  <div className="product product--edit">
    <div className="product__header">
        <h1>{t('Product')} / {t('Edit')}</h1>
    </div>
    <div className="product__product-info">
        <Form method="post" action={`/dashboard/product/edit/${product.id}`} encType="multipart/form-data">
            <div className="product-row product-row--image">
                {
                product.productPhotoBlob ?
                <div className="image-holder">
                    <input type="file" id="image" name="image" accept="image/*" />
                    <label htmlFor="image">
                        <img src={product.productPhotoBlob} alt={product.name} />
                    </label>
                </div>
                 :
                <div className="image-holder">
                    <input type="file" id="image" name="image" accept="image/*" />
                    <label htmlFor="image">
                        <Image />
                    </label>
                </div>
            }
            </div>

            <hr />

            {/* Name */}
           <EditProductInputRow 
                name={product.name} 
                nameField={t('Name')} 
                dataName='name'
                errorMessage={(data && data.type === 'name') ? data.message : null}
           />

            {/* Description */}
            <EditProductInputRow 
                name={product.description} 
                nameField={t('Description')} 
                dataName='description' 
                type='textarea'
                errorMessage={(data && data.type === 'description') ? data.message : null}
            />

            {/* product Cattegoy */}
            <SelectComponent 
                dataName='productCategoryId' 
                id={product.productCategoryId} />

            {/* Code */}
            <EditProductInputRow 
                name={product.code} 
                nameField={t('Code')} 
                dataName='code'
                errorMessage={(data && data.type === 'code') ? data.message : null}
            />

            {/* Currency to do napisać cutomowy select najlepiej jako komponent*/}
            <EditProductInputRow 
                name={product.price.currency} 
                nameField={t('Currency')} 
                dataName='currency' 
                errorMessage={(data && data.type === 'currency') ? data.message : null}
            />

            {/* Gross Price */}
            <EditProductInputRow 
                name={product.price.grossPrice} 
                nameField={t('gross_price')} 
                dataName='gross_price' 
                type='number'
                errorMessage={(data && data.type === 'gross_price') ? data.message : null}    
            />
            {/* Netto Price */}
            <EditProductInputRow 
                name={product.price.netPrice} 
                nameField={t('netto_price')} 
                dataName='netto_price' 
                type='number'
                errorMessage={(data && data.type === 'netto_price') ? data.message : null}    
            />
            {/* vatType */}
            <EditProductInputRow 
                name={product.price.vatType} 
                nameField={t('vatType')} 
                dataName='vatType'
                errorMessage={(data && data.type === 'vatType') ? data.message : null} 
            />
            {/* vatValue */}
            <EditProductInputRow 
                name={product.price.vatValue} 
                nameField={t('vatValue')} 
                dataName='vatValue' 
                type='number'
                errorMessage={(data && data.type === 'vatValue') ? data.message : null} 
            />

            <button className='product-row__button'>{t('save_product')}</button>
        </Form>
    </div>
  </div>
  );
};

export default EditProduct;
