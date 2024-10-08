import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, Form, useActionData } from "react-router-dom";


import "../../../Style/Views/Categories/add_category.scss"

import EditProductInputRow from '../../inputComponent.tsx';

import {ReactComponent as Image} from "../../../assets/Icons/image.svg"


const EditProduct: React.FC = () => {
    const [ t ] = useTranslation();
    const category = useLoaderData();   
    const data = useActionData();
    

  return (
  <div className="category category--edit">
    <div className="category__header">
        <h1>{t('Product')} / {t('Edit')}</h1>
    </div>
    <div className="category__category-info">
        <Form method="post" action={`/dashboard/category/edit/${category.id}`} >
            
            {/* Name */}
           <EditProductInputRow 
                name={category.name} 
                nameField={t('category_name')}
                className="category-row"
                dataName='name'
                errorMessage={(data && data.type === 'name') ? data.message : null}
           />

            <button className='category-row__button'>{t('save_category')}</button>
        </Form>
    </div>
  </div>
  );
};

export default EditProduct;
