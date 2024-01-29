import React from "react";
import './Footer.css';

const Footer = () => {
    return (<div id="Footer">MonoMind &copy;{" "+new Date().getFullYear()+" Dennis-Immanuel Czogalla"}<a href="https://github.com/denczo/monomind">Github</a></div>);
}

export default Footer;