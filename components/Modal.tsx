import React, { useContext } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: any;
}

// export const ModalComponent = React.forwardRef(
//   (propsValues: ModalProps, ref) => {
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
    const closable = true; 
    const handleOk = () => {
        
        // Upload file
        
        onClose();
    };
    const handleCancel = () => {
        if (!closable) return;
        onClose();
    };

    return ( 
        <div className={`modal fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ${isOpen ? 'open' : ''}`}>
                <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                    <div className="text-center">
                        {content && (
                            <div className="text-lg text-gray-500">
                                {content} 
                            </div>
                        )}
                        <hr />
                        <button className="close-button rounded bg-gray-900 px-3 py-1 mt-3 text-xs"
                            onClick={handleOk}>
                            Upload
                        </button>
                        <button className="close-button rounded bg-gray-900 px-3 py-1 mt-3 text-xs"
                            onClick={handleCancel}>
                            Close
                        </button> 
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