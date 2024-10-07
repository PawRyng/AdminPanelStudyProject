import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import api from "../Components/RefreshToken/refreshToken.ts"

import {ReactComponent as Arrow} from "../assets/Icons/down.svg"

interface Props {
    id?: string,
    dataName: string,
    errorMessage?: string | null,
}

const SelectComponent: React.FC<Props> = ({id, dataName, errorMessage}) => {

    const [t] = useTranslation();

    const [nameElement, setNameElement] = useState(t('chooce_category'));
    const [idElement, setIdElement] = useState(id);
    const [selectElements, setSelectElements] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleClickOutside = (event: MouseEvent) => {
       if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false); 
     };


    useEffect(()=>{
        const tokenId = Cookies.get('token');
        if(tokenId){
            api.post('/ProductCategory/product-categories',
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${tokenId}`
                    }
                }
            )
            .then(data=> {
                setSelectElements(data.data.data.data)
                if(id){
                    data.data.data.data?.map(item => id === item.id && setNameElement(item.name))
                }
            })
            .catch(error => console.error('error in dowoland data', error))
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
    };
    }, [])


  return (
    <div className="select-element" ref={containerRef}>
            <input type="hidden" name={dataName} defaultValue={idElement}/>
            <div className={`select-element__holder${isOpen ? ' select-element__holder--open' : ''}`}>
                <p className='active-element' onClick={()=> setIsOpen(!isOpen)}>{nameElement} <Arrow /></p>
                <ul className='list-of-elements' tabIndex="-1">
                    {selectElements?.map(item=> <li onClick={()=> {setIdElement(item.id); setNameElement(item.name); setIsOpen(false)}}>{item.name}</li>)}
                </ul>
            </div>
            {
                errorMessage &&
                <p className='select-element__error-message'>{t(errorMessage)}</p>
            }
    </div>
  
  );
};

export default SelectComponent;
