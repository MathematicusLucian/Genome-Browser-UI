import React from 'react';
import { Button } from './ui/button';
import { Separator } from '@radix-ui/react-separator';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: any;
    content: any;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, content }) => { 

    return (
        <div className={`drawer bg-slate-200 dark:bg-gray-900 py-3 px-4 border-0 ${isOpen ? 'open' : ''}`}>  
        
            <div className="flex flex-row">
                <Button className="close-button rounded px-3 mt-2 bg-gray-900 dark:bg-white text-xs text-white dark:text-zinc-900"
                    onClick={onClose}>
                    Close
                </Button>  
                <Separator orientation="vertical" className="mx-2 h-4" />
                <h2 className="px-4 mt-3 text-xl font-bold text-gray-900 dark:text-white leading-snug">{title ? title : ('404')}</h2>
            </div>

            <div className="drawer-content pl-10 p-25">                  
                {content ? content : ('Lorem ipsum')}
            </div>

            <style jsx>{`
                .drawer { 
                    text-align: left;
                     border-color: #e5e7eb;
                    margin: 0 auto;
                    padding: 0.6rem;
                    font-size: 0.9rem;
                    line-height: 2rem; 
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 90%; 
                    box-shadow: 2px 0 5px rgba(0,0,0,0.5);
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    z-index: 1000;
                } 
                .drawer.open {
                    transform: translateX(0);
                }
            `}</style>
        </div>
    );
};

export default Drawer;