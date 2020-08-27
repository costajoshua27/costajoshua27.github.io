import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, notable } = this.props.project;
    const notableElement = notable ? <p className="notable">{notable}</p> : null;

    const unactive = (
            <div className='project speech-bubble-right' onClick={this.props.changeFocusedProject.bind(this,this.props.project)}>
                <h3>{title}</h3>
                {notableElement}
            </div>
    );
    const active = (
            <div className='project activeProject speech-bubble-left bouncySlow' onClick={this.props.changeFocusedProject.bind(this,this.props.project)}>
                <h3>{title}</h3>
                {notableElement}
            </div>
    );

    return (
        <React.Fragment>
            {this.props.project === this.props.focusedProject ? active : unactive}
        </React.Fragment>
    );
  }
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    focusedProject: PropTypes.object.isRequired,
    changeFocusedProject: PropTypes.func.isRequired
};

export default Project;
