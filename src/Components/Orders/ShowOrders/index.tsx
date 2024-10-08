import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from "react-router-dom";

import TabRowComponent from '../../tabRowElement.tsx';
import TabRowComponentSkeleton from '../../tabRowElementSkeleton.tsx';

import "../../../Style/Views/Orders/OrdersShow/orders.scss"



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
                    <th className='id'>{t('ID')}</th>
                    <th className='name'>{t('Number')}</th>
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
            modalLabel={t("chcesz usunąć ten produkt")} 
            editPath={'/dashboard/product/edit'} 
            deletePath={'/dashboard/product/delete'}
            />) : <TabRowComponentSkeleton columnQuantity={2} rowsQuantity={10}/>}
            </tbody>
        </table>
    </div>
  </div>
  );
};

export default Orders;
