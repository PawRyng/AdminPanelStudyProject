import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';

import {ReactComponent as Edit} from "../../../assets/Icons/edit.svg" 
import {ReactComponent as Save} from "../../../assets/Icons/save.svg" 
import {ReactComponent as Close} from "../../../assets/Icons/close.svg" 


interface ChangeValueProp {
    newValue: any;
    setValueFunction: React.Dispatch<React.SetStateAction<any>>;
}
interface Props {
    name: string,
    nameField: string,
    dataName: string,
    type?: string,
    errorMessage?: string | null,
    setErrorMessage?: React.Dispatch<React.SetStateAction<any>>
}

const EditProductInputRow: React.FC<Props> = ({name, nameField, type = 'text', dataName, errorMessage, setErrorMessage}) => {
    const [nameElement, setNameElement] = useState(name);
    const [isEditName, setIsEditName] = useState(false)
    const [t] = useTranslation();

    const oldName:string = name ? name : '';   

    useEffect(() => {
        if (errorMessage) {
            setIsEditName(true);
        }
    }, []);
    const changeValue = ({ newValue, setValueFunction }: ChangeValueProp) => setValueFunction(newValue)

  return (
    <div className="product-row product-row--name">
        {
            type === 'textarea' ?
                <textarea 
                    name={dataName}
                    value={nameElement}
                    onChange={(e) => changeValue({ newValue: e.target.value, setValueFunction: setNameElement })}
                    placeholder={nameField}
                    className={!isEditName && 'disabled'}
                ></textarea>
            :
            <input
                type={type}
                name={dataName}
                value={nameElement}
                onChange={(e) => changeValue({ newValue: e.target.value, setValueFunction: setNameElement })}
                placeholder={nameField}
                className={!isEditName && 'disabled'}  
                 step={type=='number' && "0.01"}
            />
        }
        
        <div className="product-row__actions">
            {
                !isEditName &&
                <button type="button" onClick={() => setIsEditName(true)}>
                    <Edit/>
                </button>
            }
            {
                isEditName && 
                <>
                    <button type='submit'>
                        <Save />
                    </button>
                    <button type="button" onClick={()=> { setNameElement(oldName); setIsEditName(false);} }>
                        <Close/>
                    </button>
                </>
            }
        </div>
            {
                errorMessage &&
                <p className='product-row__error-message'>{t(errorMessage)}</p>
            }
    </div>
  
  );
};

export default EditProductInputRow;
