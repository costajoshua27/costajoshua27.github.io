import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFile, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { resume, emailLink, linkedinLink, githubLink } from "../data/navbar";

function Navbar() {
  return (
    <nav className="container-fluid">
      <div className="container">
        <h2 className="bouncyFastAndColor">JOSHUA COSTA</h2>
        <ul>
          <li>
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="icon" icon={faLinkedin}/>
            </a>
          </li>
          <li>
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="icon" icon={faGithub}/>
            </a>
          </li>
          <li>
            <a href={resume} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="icon" icon={faFile}/>
            </a>
          </li>
          <li>
            <a href={emailLink} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="icon" icon={faEnvelope}/>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;