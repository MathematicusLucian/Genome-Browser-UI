// import Button from 'antd/es/button';
import React from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    content: any;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, content }) => {
    return (
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
            <div className="drawer-content">
                <button className="close-button rounded bg-gray-900 px-3 py-1 mt-3 text-xs"
                    onClick={onClose}>
                    Close
                </button>
                <hr />
                <h2>Gene Variant Details</h2>
                {content && (
                    <div>
                        {Object.entries(content).map(([key, value]) => (
                            <p key={key}><strong>{key}:</strong> {value}</p>
                        ))}
                    </div>
                )}
            </div>
            <style jsx>{`
                .drawer {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 90%;
                    background: white;
                    box-shadow: 2px 0 5px rgba(0,0,0,0.5);
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    z-index: 1000;
                }
                div {
                    width: 80%;
                    padding: 1em;
                }
                .drawer.open {
                    transform: translateX(0);
                }
                .drawer-content {
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
    );
};

export default Drawer;