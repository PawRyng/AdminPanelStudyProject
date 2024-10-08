import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

// svgs
import {ReactComponent as NotFoundIcon} from "../../assets/Icons/404.svg";

// style
import "./style.scss"

const NoFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='NotFoundPage'>
      <NotFoundIcon  className='NotFoundPage__icon'/>
      <h1  className='NotFoundPage__text'>{t('page_not_found')}</h1>
      <Link className='NotFoundPage__button' to={"/"}>
        {t("page_not_found_button")}
        <svg height="20" width="20" viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg" id="fi_2459427"><g id="Arrow_Outline" data-name="Arrow Outline"><path d="m19.5078 8.3394h-11.5585l1.1722-1.7419a1.5326 1.5326 0 0 0 -1.2683-2.3931h-.0032a1.67 1.67 0 0 0 -1.3042.6268l-3.6065 4.5088a.8.8 0 0 0 0 .9995l3.6069 4.5085a1.67 1.67 0 0 0 1.3042.6269h.0028a1.5326 1.5326 0 0 0 1.2683-2.393l-1.1725-1.7425h11.5588a6.728 6.728 0 1 1 0 13.456h-3.2715a1.5 1.5 0 0 0 0 3h3.2715a9.728 9.728 0 1 0 0-19.456z"></path></g></svg>  
      </Link>
    </div>
  );
};

export default NoFound;
