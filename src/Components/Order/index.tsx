import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, Link } from "react-router-dom";
import TabRowComponent from '../tabRowElement.tsx';
import TabRowComponentSkeleton from '../tabRowElementSkeleton.tsx';
import {ReactComponent as Image} from "../../assets/Icons/image.svg";
import {ReactComponent as ProductsIcon} from "../../assets/Icons/toiletries.svg"

import "../../Style/Views/order.scss"

interface Order {
    apartmentNo: string;
    basketId: string;
    buildingNo: string;
    city: string;
    customerId: string;
    email: string;
    id: string;
    lastName: string;
    name: string;
    number: string;
    phoneNumber: string;
    postalCode: string;
    price: {
        netPrice: number,
        grossPrice: number,
        vatValue: number,
        currency: string
    };
    productDtos: any[]; 
    street: string;
    tin: string;
    companyName: string;
  }

const Order: React.FC = () => {
    const [ t ] = useTranslation();
    const order = useLoaderData() as Order;
  return (
  <div className="order">
    <div className="order__header">
        <h1>{t('Order')}: {order?.number}</h1>
    </div>
    <div className="order-info">
        <div className="order-info__user">
            <h3>{t('User_data')}</h3>
            <p><span>{t('Name')}:</span> {order.name}</p>
            <p><span>{t('Last_name')}:</span>{order.lastName}</p>
            <p><span>{t('Mail')}:</span>{order.email}</p>
            <p><span>{t('Phone')}:</span>{order.phoneNumber}</p>
            <p><span>{t('Company')}:</span>{order?.companyName}</p>
            <p><span>{t('Nip')}:</span>{order.tin}</p>
        </div>
        <div className="order-info__address">
            <h3>{t('User_address')}</h3>
            <p><span>{t('Postal_Code')}:</span> {order.postalCode}</p>
            <p><span>{t('City')}:</span> {order.city}</p>
            <p><span>{t('Street')}:</span> {order.street}</p>
            <p><span>{t('Building_No')}:</span> {order.buildingNo}</p>
            <p><span>{t('Apartment_No')}:</span> {order.apartmentNo}</p>
        </div>
        <div className="order-info__cart">
            <h3>{t('Cart_price')}</h3>
            <p><span>{t('Gross_Price')}:</span> {order.price.grossPrice} {order.price.currency}</p>
            <p><span>{t('Netto_Price')}:</span> {order.price.netPrice} {order.price.currency}</p>
            <p><span>{t('Vat_Value')}:</span> {order.price.vatValue}</p>
        </div>
        <div className="order-info__products">
            <h3>{t('Products')}</h3>
            {
                 order.productDtos.map((item, index) => 
                <div key={index} className="product">
                    <span className="product__image">
                        {
                             item.productPhotoBase64 ?
                            <img src={`data:image/png;base64,${item.productPhotoBase64}`} alt={item.name} />
                              :
                                <Image />
                        }
                    </span>
                    <span className="product__name">
                        {item.name}
                    </span>
                    <span className="product__price">
                        {
                            item.price.grossPrice
                        }&nbsp;
                        {
                            item.price.currency
                        }
                    </span>
                    <Link className='product__button' to="/dashboard"><ProductsIcon/></Link>
                </div>
                )
                }
            
        </div>
       
    </div>
  </div>
  );
};

export default Order;
