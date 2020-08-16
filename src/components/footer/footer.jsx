import React from 'react';
import './footer.css';

import dumaIcon from '../../assets/duma.png';
import githubIcon from '../../assets/github.png';
import linkedinIcon from '../../assets/linkedin.png';

function Footer() {
  return (
    <div className="footer">
      <p>© Jillian Duma All Rigths Reserved</p>
      <div className="iconWrapper">
        <a href="https://jillianduma.com/" target="_blanket"><img className="icon" src={dumaIcon} alt="duma-icon"/></a>
        <a href="https://www.linkedin.com/in/jillian-duma-174394112/" target="_blanket"><img className="icon" src={linkedinIcon} alt="linkedin-icon"/></a>
        <a href="https://github.com/jduma108" target="_blanket"><img className="icon" src={githubIcon} alt="github-icon"/></a>
      </div>
    </div>
  );
}

export default Footer;
