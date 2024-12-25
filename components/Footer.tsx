import React from "react";

const Footer = () => {
    return (
        <footer>
            <div>
                <strong>Genome Browser UI, and Genome Browser API</strong>, &copy; Luke Jones {new Date().getFullYear()}
            </div>
            <style jsx>{` 
                div {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    flex-direction: row;
                    justify-content: baseline;
                    align-items: center;
                    font-size: 0.7rem;
                    align-items: flex-end;
                }
                img {
                    margin-left: 0.5rem;
                }
                a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }
            `}</style> 
        </footer>
    )
};

export default Footer;