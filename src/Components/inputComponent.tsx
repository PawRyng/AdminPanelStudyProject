import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import {ReactComponent as Close} from "../assets/Icons/close.svg" 


interface ChangeValueProp {
    newValue: any;
    setValueFunction: React.Dispatch<React.SetStateAction<any>>;
}
interface Props {
    name?: string,
    nameField: string,
    className?: string,
    dataName: string,
    type?: string,
    errorMessage?: string | null,
    setErrorMessage?: React.Dispatch<React.SetStateAction<any>>
}

const InputComponent: React.FC<Props> = ({name, nameField, className="product-row", type = 'text', dataName, errorMessage, setErrorMessage}) => {
    const [nameElement, setNameElement] = useState(name ? name : "");
    const [isEdited, setIsEdited] = useState(false);
    const [t] = useTranslation();

    const oldName:string = name ? name : '';   

    const changeValue = ({ newValue, setValueFunction }: ChangeValueProp) => {
        setValueFunction(newValue); 

        if(newValue !== oldName){
            setIsEdited(true);
        }
        else{
            setIsEdited(false);
        }
    }

  return (
    <div className={`${className} ${className}--name`}>
        <label htmlFor={dataName}>{nameField}</label>
        {
            type === 'textarea' ?
                <textarea 
                    name={dataName}
                    value={nameElement}
                    onChange={(e) => changeValue({ newValue: e.target.value, setValueFunction: setNameElement })}
                    placeholder={nameField}
                    id={dataName}
                ></textarea>
            :
            <input
                type={type}
                name={dataName}
                value={nameElement}
                onChange={(e) => changeValue({ newValue: e.target.value, setValueFunction: setNameElement })}
                placeholder={nameField}
                 step={type=='number' && "0.01"}
                 id={dataName}
            />
        }
        
        <div className={`${className}__actions`}>
            {
                isEdited && 
                    <button type="button" onClick={()=> { setNameElement(oldName); setIsEdited(false)} }>
                        <Close/>
                    </button>
            }
        </div>
            {
                errorMessage &&
                <p className={`${className}__error-message`}>{t(errorMessage)}</p>
            }
    </div>
  
  );
};

export default InputComponent;
