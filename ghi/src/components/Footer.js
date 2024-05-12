import React from 'react';
import { Divider, Link } from '@chakra-ui/react'
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <Divider />
            Created by <Link href="https://www.linkedin.com/in/wmccrae" target="_blank" isExternal>Wanda L. McCrae</Link>, Copyright 2024. Code available on <Link href="https://github.com/wlmccrae/headline-editor" target="_blank" isExternal>GitHub</Link>.
        </div>
    )
};

export default Footer;
