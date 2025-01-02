import React, { useContext } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: any;
  content: any;
  isOkButtonVisible?: any;
  isCancelButtonVisible?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, isOkButtonVisible, isCancelButtonVisible=true }) => {
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
        // Backdrop
        <div className={`modal fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center text-center ${isOpen ? 'open' : ''}`}
            onClick={handleCancel} 
        >
                {/* Modal itself */}
                <div className=" border w-full shadow-lg rounded-md bg-white dark:bg-gray-900 items-center justify-center text-center">

                    {/* Modal toolbar */}
                    <div className="flex flex-row w-full items-center justify-center text-center px-20">

                        <div className="flex-1 py-5">
                            <h2 className="mt-0 text-xl font-bold text-gray-900 dark:text-white leading-relaxed">{title || ('404')}</h2>
                        </div>

                        <Separator orientation="vertical" className="flex mx-2 h-4" /> 

                        <div className="flex-1 leading-relaxed">
                            {isOkButtonVisible &&  (
                                <Button className="close-button rounded px-3 py-1 bg-gray-900 dark:bg-white text-xs text-white dark:text-zinc-900"
                                onClick={handleOk}>
                                    Upload
                                </Button>
                            )}  
                            {isCancelButtonVisible && (
                                <Button className="close-button rounded px-3 py-1 bg-gray-900 dark:bg-white text-xs text-white dark:text-zinc-900"
                                onClick={handleCancel}>
                                    Close
                                </Button>
                            )} 
                        </div>

                    </div>
                    
                    {/* Modal content */}
                    <div className="flex flex-row w-full items-center justify-center text-center px-20 pt-4 pb-16">    

                        {content && (
                            <div className="text-sm text-gray-900 dark:text-white">
                                {content} 
                            </div>
                        )}

                    </div> 

                {/* End: Modal itself */}
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
                    text-align: center;
                    margin: 0 auto;
                } 
                .modal.open {
                    transform: translateX(0);
                }
                .modal-content {
                    padding: 20px;
                } 
            `}</style> 
        </div> 
    ) 
};

export default Modal;