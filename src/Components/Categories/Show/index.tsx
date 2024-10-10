import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, Link } from "react-router-dom";

import TabRowComponent from '../../tabRowElement.tsx';

import "../../../Style/Views/Categories/show_categories.scss";

import TabRowComponentSkeleton from '../../tabRowElementSkeleton.tsx';


const Categories: React.FC = () => {
    const [ t ] = useTranslation();
    const categories = useLoaderData();
  return (
  <div className="categories">
    <div className="categories__header">
        <h1>{t('Categories')}</h1>
        <div className="button-holder">
            <Link to={'/dashboard/category/add'}>{t('Add Category')}</Link>
        </div>
    </div>
    <div className="categories__table">
        <table>
            <thead>
                <tr>
                    <th className='name'>{t('name')}</th>
                    <th className='actions'>{t('actions')}</th>
                </tr>
            </thead>
            <tbody>
            { 
            categories ? 
            categories.map((item, index) => <TabRowComponent 
            key={index} 
            id={item.id} 
            name={item.name} 
            modalLabel={t("delete_category_message")} 
            editPath={'/dashboard/category/edit'} 
            deletePath={'/dashboard/category/delete'} 
            />) : <TabRowComponentSkeleton columnQuantity={1} rowsQuantity={10}/>}
            </tbody>
        </table>
    </div>
  </div>
  );
};

export default Categories;
