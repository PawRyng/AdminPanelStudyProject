import React from 'react';
import { useTranslation } from 'react-i18next';
import "../../Style/Views/Home.scss"

const HomeView: React.FC = () => {
    const [ t ] = useTranslation();
  return (
    <h2 className="home">{t('Hello')}</h2>
  );
};

export default HomeView;
