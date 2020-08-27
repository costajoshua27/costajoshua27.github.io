import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

class FocusedProject extends Component {
    render() {
        const { title, image, description, technologies, githubLink, liveLink } = this.props.project;

        const allTechnologies = technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
        ));

        const githubIcon = <a href={githubLink} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon className="icon" icon={faGithub}/>
                            </a>;

        const linkIcon = liveLink ? <a href={liveLink} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon className="icon" icon={faExternalLinkAlt}/>
                            </a> : null;

        const imageStyle = {
            'backgroundImage': `url(${image}`,
            'backgroundSize': '100% 100%',
            'backgroundRepeat': 'no-repeat',
            'backgroundClip': 'border-box',
        }

        return (
            <div id="focusedProject" style={imageStyle}>
                <div className="row justify-content-center">
                    <div>
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <ul>
                            {allTechnologies}
                        </ul>
                        {githubIcon}
                        {linkIcon}
                    </div>
                </div>
            </div>
        )
    }
}

FocusedProject.propTypes = {
    project: PropTypes.object.isRequired
}

export default FocusedProject;
