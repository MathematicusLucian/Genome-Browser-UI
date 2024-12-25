import React from "react";

const Footer = () => {
    return (
        <div>
            <footer>
                <strong>Genome Browser UI, and |Genome Browser API</strong>, &copy; Luke Jones {new Date().getFullYear()}
            </footer>
            <style jsx>{`
            footer {
                width: 100%;
                height: 100px;
                border-top: 1px solid #eaeaea;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.7rem;
            }
            footer img {
                margin-left: 0.5rem;
            }
            footer a {
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                color: inherit;
            }
            `}</style>
        </div>
    )
};

export default Footer;