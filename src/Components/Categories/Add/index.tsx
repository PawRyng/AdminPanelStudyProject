import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useActionData } from 'react-router-dom';

import "../../../Style/Views/Categories/add_category.scss"

import InputComponent from '../../inputComponent.tsx';

const Categories: React.FC = () => {
    const [ t ] = useTranslation();
    const data = useActionData();
    
  return (
  <div className="category category--add">
    <div className="category__header">
      <h1>{t('Category')} / {t('Add')}</h1>
    </div>
    <div className="category__category-info">
        <Form action='/dashboard/category/add' method='post'>
            <InputComponent nameField={t('category_name')} dataName='name' className="category-row" errorMessage={(data && data.type === 'name') ? data.message : null}/>

            <button className='category-row__button' type='submit'>{t('save_category')}</button>
        </Form>
    </div>
  </div>
  );
};

export default Categories;
