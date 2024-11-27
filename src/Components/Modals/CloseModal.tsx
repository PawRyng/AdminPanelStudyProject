// Modal.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import "../../Style/Components/Modals/style.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
       ( 
        <>
            <div className="modal-overlay" >
                <div className="modal-content">
                    {children}
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>    
        </>
    ),
        document.getElementById('modal-root') as HTMLElement
    );
};

export default Modal;
