import { useLoaderData } from 'react-router';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import TabRowComponent from '../tabRowElement.tsx';

import "../../Style/Views/users.scss"

import TabRowComponentSkeleton from '../tabRowElementSkeleton.tsx';


const Users: React.FC = () => {
    const [ t ] = useTranslation();
    const users = useLoaderData();

  return (
  <div className="users">
    <h1>{t('Users')}</h1>
    <div className="users__table">
        <table>
            <thead>
                <tr>
                    <th className='lp'>{t('ID')}</th>
                    <th className='name'>{t('name')}</th>
                    <th className='actions'></th>
                </tr>
            </thead>
            <tbody>
                { users ? users.map((item, index) => <TabRowComponent key={index} id={item.id} name={item.firstName} modalLabel={t("chcesz usunąć tego użytkownika")} />) : <TabRowComponentSkeleton columnQuantity={2} rowsQuantity={10}/>}
                
            </tbody>
        </table>
    </div>
  </div>
  );
};

export default Users;
