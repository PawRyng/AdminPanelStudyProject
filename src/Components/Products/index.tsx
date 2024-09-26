import { table } from 'console';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import TabRowComponent from '../tabRowElement.tsx';

import "../../Style/Views/products.scss"

import TabRowComponentSkeleton from '../tabRowElementSkeleton.tsx';


const Products: React.FC = () => {
    const [ t ] = useTranslation();
    const testTable = [
        {
            name: "test",
            id: 1,
            price: 12,
            quantity: 1
        },
        {
            name: "test",
            id: 2,
            price: 12,
            quantity: 1
        },
        {
            name: "sdggggggggggggggggggggggggggggggggggggggggggggggggggggg",
            id: 3,
            price: 12,
            quantity: 1
        },
        {
            name: "test",
            id: 4,
            price: 12,
            quantity: 1
        },
        {
            name: "test",
            id: 5,
            price: 12,
            quantity: 1
        },
        {
            name: "test",
            id: 12,
            price: 12,
            quantity: 1
        },
    ]
  return (
  <div className="products">
    <h1>{t('Products')}</h1>
    <div className="products__table">
        <table>
            <thead>
                <tr>
                    <th className='lp'>{t('LP')}</th>
                    <th className='name'>{t('name')}</th>
                    <th className='price'>{t('price')}</th>
                    <th className='quantity'>{t('quantity')}</th>
                    <th className='actions'>{t('actions')}</th>
                </tr>
            </thead>
            <tbody>
                {/* {testTable.map(item => <TabRowComponent id={item.id} name={item.name} price={item.price} quantity={item.quantity} />)} */}
                <TabRowComponentSkeleton columnQuantity={4} rowsQuantity={10}/>
            </tbody>
        </table>
    </div>
  </div>
  );
};

export default Products;
