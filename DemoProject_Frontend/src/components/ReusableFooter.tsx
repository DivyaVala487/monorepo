import React from 'react';
import './styles.css';
import { FooterProps } from '../dtos/FooterDtos'; 

const Footer: React.FC<FooterProps> = ({
    logo,
    email,
    phone,
    services,
    technologies,
    links,
    resources,
    socialMediaLinks,
    copyrightText,
}) => {
    return (
        <footer className="footer-container">
            <div className="footer-grid">
                <div className="footer-column">
                    <img src={logo} alt="Company Logo" className="footer-logo" />
                    <p className="footer-contact">
                        <a href={`mailto:${email}`}>{email}</a>
                    </p>
                    <p className="footer-contact">
                        <a href={`tel:${phone}`}>{phone}</a>
                    </p>
                </div>

                <div className="mobile-social-icons">
                    {socialMediaLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                        >
                            {React.createElement(social.icon, { size: 35 })}
                        </a>
                    ))}
                </div>

                <div className="footer-column">
                    <h3 className="footer-heading">Salesforce Services</h3>
                    <div className="expandable-section">
                        {services.map((service, index) => (
                            <a key={index} href="#" className="footer-link">{service}</a>
                        ))}
                    </div>
                </div>

                <div className="footer-column">
                    <h3 className="footer-heading">Technologies</h3>
                    <div className="expandable-section">
                        {technologies.map((tech, index) => (
                            <a key={index} href="#" className="footer-link">{tech}</a>
                        ))}
                    </div>
                </div>

                <div className="footer-column">
                    <h3 className="footer-heading">Resources & Links</h3>
                    <div className="expandable-section">
                        {links.map((link, index) => (
                            <a key={index} href="#" className="footer-link">{link}</a>
                        ))}
                        <hr className="footer-divider" />
                        {resources.map((resource, index) => (
                            <a key={index} href="#" className="footer-link">{resource}</a>
                        ))}
                    </div>
                </div>

                <div className="footer-column mobile">
                    <h3 className="footer-heading">Connect with Us</h3>
                    <div className="expandable-section">
                        <div className="social-icons">
                            {socialMediaLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                >
                                    {React.createElement(social.icon, { size: 25 })}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-row">
                <p className="footer-copyright">{copyrightText}</p>
            </div>
        </footer>
    );
};

export default Footer;

