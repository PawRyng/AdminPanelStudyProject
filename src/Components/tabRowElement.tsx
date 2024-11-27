import { table } from 'console';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Form } from 'react-router-dom';


import Modal from './Modals/CloseModal.tsx';
// icons
import {ReactComponent as Trash} from "../assets/Icons/trash.svg" 
import {ReactComponent as Edit} from "../assets/Icons/edit.svg" 


interface Params {
    name: string,
    id: number,
    email?: string,
    price?: number,
    currency?: string,
    quantity?: number,
    modalLabel: string,
    editPath?: string,
    deletePath?: string,
}

const TabRowComponent: React.FC<Params> = ({name,id, price, quantity, email, modalLabel, editPath, deletePath, currency}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [t]   = useTranslation();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  return (
    <>
        <tr>
            <td className='lp'>{id}</td>
            <td className='name'>{name}</td>
            {email && <td className='email'>{email}</td>}
            {price && <td className='price'>{price} {currency}</td>}
            {quantity && <td className='quantity'>{quantity}</td>}

            <td className='actions'>
                {
                    editPath && <Link to={`${editPath}/${id}`}><Edit/></Link>
                }

                {
                    deletePath && <button onClick={openModal}><Trash/></button>
                }
                
                
            </td>
        </tr>
        {
            deletePath &&
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>{modalLabel}</h2>
                <p>{name}</p>
                <div className="modal-actions">
                    <Form method="post" action={deletePath} onSubmit={()=> setIsModalOpen(false)}>
                        <input name='id' className='hidden' type="text" defaultValue={id}/>
                        <button type='submit'>Tak</button>
                    </Form>
                    <button onClick={closeModal}>Nie</button>
                </div>
            </Modal>
        }
    </>
  );
};

export default TabRowComponent;
