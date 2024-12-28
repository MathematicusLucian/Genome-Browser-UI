import React, { useContext } from "react";
import { Button } from "./ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
  isOkButtonViisible?: any;
  isCancelButtonViisible?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content, isOkButtonViisible, isCancelButtonViisible=true }) => {
    const closable = true; 
    const handleOk = () => {
        onClose();
    };
    const handleCancel = (e) => { 
        const classesWhereClickEventClosesModal = ['modal', 'close-button'];
        const validClickEvent = classesWhereClickEventClosesModal.some(classOfItemClicked => e.target.className.includes(classOfItemClicked))
        if (!closable || !validClickEvent) return;
        onClose();
    };

    return ( 
        <div className={`modal fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center text-center ${isOpen ? 'open' : ''}`}
            onClick={handleCancel} 
        >
                <div className="p-8 border w-50 shadow-lg rounded-md bg-white dark:bg-gray-900">
                    <div className="text-center">
                        {content && (
                            <div className="text-sm text-gray-900 dark:text-white">
                                {content} 
                            </div>
                        )}
                        {isOkButtonViisible && (<Button className="close-button rounded px-3 py-1 mt-3 bg-gray-900 dark:bg-white text-xs text-white dark:text-zinc-900"
                            onClick={handleOk}>
                            Upload
                        </Button>)}
                        {isCancelButtonViisible && (<Button className="close-button rounded px-3 py-1 mt-3 bg-gray-900 dark:bg-white text-xs text-white dark:text-zinc-900"
                            onClick={handleCancel}>
                            Close
                        </Button>)}
                    </div>
                </div>

            <style jsx>{`
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%; 
                    box-shadow: 2px 0 5px rgba(0,0,0,0.5);
                    transform: translateY(100%);
                    transition: transform 0.5s ease;
                    z-index: 2000;
                } 
                div {
                    width: 80%;
                    padding: 1em;
                }
                h1 {
                    font-size: 1rem;
                }
                h2, p, label, li {
                    font-size: 0.8rem;
                }
                .modal.open {
                    transform: translateX(0);
                }
                .modal-content {
                    padding: 20px;
                }
                .close-button {
                    background: red;
                    color: white;
                    border: none;
                    padding: 10px;
                    cursor: pointer;
                }
            `}</style> 
        </div> 
    ) 
};

export default Modal;