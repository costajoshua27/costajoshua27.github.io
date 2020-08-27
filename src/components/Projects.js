import React, { Component } from 'react';
import Project from './Project';
import FocusedProject from './FocusedProject';
import PropTypes from 'prop-types';

class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'focusedProject' : this.props.focusedProject
    };
    this.changeFocusedProject = this.changeFocusedProject.bind(this);
  }
    
  changeFocusedProject = (newProject) => {
      this.setState({ focusedProject: newProject });
  }

    render() {
        const focusedProject = <FocusedProject project={this.state.focusedProject} />;
        const allProjects = this.props.projects.map((project) => (
            <Project key={project.id} project={project} focusedProject={this.state.focusedProject} changeFocusedProject={this.changeFocusedProject} />
        ));

        return (
            <div className="container section">
                <h3 className="speech-bubble-left bouncySlow" id="projectsHeader">Check out my projects!</h3>
                {focusedProject}
                <div id="projects">
                    {allProjects}
                </div>
            </div>
        );
    }
}

// PropTypes
Projects.propTypes = {
    projects: PropTypes.array.isRequired,
    focusedProject: PropTypes.object.isRequired,
};

export default Projects;