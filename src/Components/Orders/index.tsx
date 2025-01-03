import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from "react-router-dom";

import TabRowComponent from '..//tabRowElement.tsx';

import "../../Style/Views/orders.scss"

import TabRowComponentSkeleton from '../tabRowElementSkeleton.tsx';


const Orders: React.FC = () => {
    const [ t ] = useTranslation();
    const orders = useLoaderData();
  return (
  <div className="orders">
    <div className="orders__header">
        <h1>{t('Orders')}</h1>
    </div>
    <div className="orders__table">
        <table>
            <thead>
                <tr>
                    <th className='lp'>{t('Id')}</th>
                    <th className='lp'>{t('Number')}</th>
                    <th className='actions'>{t('actions')}</th>
                </tr>
            </thead>
            <tbody>
            { 
            orders ? 
            orders.map((item, index) => <TabRowComponent 
            key={index} 
            id={item.id}
            name={item.number} 
            editPath={`/dashboard/order/edit`}
            />) : <TabRowComponentSkeleton columnQuantity={2} rowsQuantity={10}/>}
            </tbody>
        </table>
    </div>
  </div>
  );
};

export default Orders;
