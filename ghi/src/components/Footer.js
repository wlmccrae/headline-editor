import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <hr />
            Created by <Link to="https://www.linkedin.com/in/wmccrae" target="_blank">Wanda L. McCrae</Link>, Copyright 2024. Code available on <Link to="https://github.com/wlmccrae/headline-editor" target="_blank">GitHub</Link>.
        </div>
    )
};

export default Footer;
