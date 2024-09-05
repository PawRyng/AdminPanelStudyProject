import React from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const logoutHandler = () => {
        Cookies.remove('token')
        navigate('/login')
    };
 
  return (
   <nav>
    <button onClick={logoutHandler}>{t('logout')}</button> 
   </nav>
  );
};

export default Navigation;
