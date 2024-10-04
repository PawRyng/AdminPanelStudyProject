import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useActionData } from "react-router-dom";


import "../../../Style/Views/product_add.scss"

import {ReactComponent as Image} from "../../../assets/Icons/image.svg"

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
            {/* product Cattegoy to do lista rozwijana*/}
            <input type="hidden" name="productCategoryId" defaultValue="3bbf881c-7e18-458c-b6e1-3b396ea5a183" />
            {/* Name */}
            <div className="product-row">
                <label htmlFor="name">{t('name')}</label>
                <input type="text" name="name" id='name' placeholder=' '/>
                {
                    data && data.type === "name" ? <p className='product-row__error-message'>{t(data.message)}</p> : null
                }
            </div>

            {/* Description */}
            <div className="product-row">
                <label htmlFor="description">{t('description')}</label>
                <textarea name="description" id="description" placeholder=' '></textarea>
                {
                    data && data.type === "description" ? <p className='product-row__error-message'>{t(data.message)}</p> : null
                }
            </div>
            {/* Code */}
            <div className="product-row">
                <label htmlFor="code">{t('code')}</label>
                <input type="text" id='code' name="code" placeholder=' '/>
                {
                    data && data.type === "code" ? <p className='product-row__error-message'>{t(data.message)}</p> : null
                }
            </div>
            {/* Currency to do napisać cutomowy select najlepiej jako komponent*/}
            <div className="product-row">
                <label htmlFor="currency">{t('Currency')}</label>
                <input type="text" name="currency" id="currency" placeholder=' '/>
                {
                    data && data.type === "currency" ? <p className='product-row__error-message'>{t(data.message)}</p> : null
                }
            </div>
            {/* Gross Price */}
            <div className="product-row">
                <label htmlFor="gross_price">{t('Gross_Price')}</label>
                <input type="number" name="gross_price" id='gross_price' placeholder=' ' step="0.01"/>
                {
                    data && data.type === "gross_price" ? <p className='product-row__error-message'>{t(data.message)}</p> : null
                }
            </div>
            {/* Netto Price */}
            <div className="product-row">
                <label htmlFor="netto_price">{t('Netto_Price')}</label>
                <input type="number" name="netto_price" placeholder=' ' id='netto_price' step="0.01"/>
                {
                    data && data.type === "netto_price" ? <p className='product-row__error-message'>{t(data.message)}</p> : null
                }
            </div>
            {/* vatType */}
            <div className="product-row">
                <label htmlFor="vatType">{t('vatType')}</label>
                <input type="text" name="vatType" placeholder=' ' id='vatType'/>
                {
                    data && data.type === "vatType" ? <p className='product-row__error-message'>{t(data.message)}</p> : null
                }
            </div>
            {/* vatValue */}
            <div className="product-row">
                <label htmlFor="vatValue">{t('vatValue')}</label>
                <input type="number" name="vatValue" placeholder=' ' id='vatValue'/>
                {
                    data && data.type === "vatValue" ? <p className='product-row__error-message'>{t(data.message)}</p> : null
                }
            </div>

            <button className='product-row__button'>{t('add_product')}</button>
        </Form>
    </div>
  </div>
  );
};

export default AddProduct;
