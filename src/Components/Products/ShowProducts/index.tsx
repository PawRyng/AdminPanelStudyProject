import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, Link } from "react-router-dom";

import TabRowComponent from '../../tabRowElement.tsx';

import "../../../Style/Views/products.scss"

import TabRowComponentSkeleton from '../../tabRowElementSkeleton.tsx';


const Products: React.FC = () => {
    const [ t ] = useTranslation();
    const products = useLoaderData();
  return (
  <div className="products">
    <div className="products__header">
        <h1>{t('Products')}</h1>
        <div className="button-holder">
            <Link to={'/dashboard/product/add'}>{t('Add Product')}</Link>
        </div>
    </div>
    <div className="products__table">
        <table>
            <thead>
                <tr>
                    <th className='lp'>{t('LP')}</th>
                    <th className='name'>{t('name')}</th>
                    <th className='price'>{t('price')}</th>
                    <th className='actions'>{t('actions')}</th>
                </tr>
            </thead>
            <tbody>
            { 
            products ? 
            products.map((item, index) => <TabRowComponent 
            key={index} 
            id={item.id} 
            name={item.name} 
            price={item.price.grossPrice} 
            modalLabel={t("chcesz usunąć ten produkt")} 
            editPath={'/dashboard/product/edit'} 
            deletePath={'/dashboard/product/delete'} 
            currency={item.price.currency}
            />) : <TabRowComponentSkeleton columnQuantity={2} rowsQuantity={10}/>}
            </tbody>
        </table>
    </div>
  </div>
  );
};

export default Products;
